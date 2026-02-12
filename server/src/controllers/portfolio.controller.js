const Portfolio = require('../models/Portfolio');
const Template = require('../models/Template');
const { templates: seedTemplates } = require('../seeds/templates');
const slugify = require('slugify');

// POST /api/portfolios — create from template
async function createFromTemplate(req, res, next) {
  try {
    const { templateId, templateIndex, templateName } = req.body;
    const userId = req.user._id;

    // Check portfolio limit (5 for free)
    const count = await Portfolio.countDocuments({ userId, isDeleted: { $ne: true } });
    if (count >= 5 && req.user.plan === 'free') {
      return res.status(403).json({
        success: false,
        message: 'Free plan limited to 5 portfolios. Upgrade for unlimited.',
      });
    }

    // Get template data
    let template;
    try {
      if (templateId) {
        template = await Template.findById(templateId);
      }
    } catch {
      // MongoDB not available
    }

    // Fall back to seed data
    if (!template) {
      const idx = templateIndex != null ? templateIndex : undefined;
      const name = templateName?.toLowerCase();
      const seed = idx != null
        ? seedTemplates[idx]
        : seedTemplates.find((t) => t.name.toLowerCase() === name);

      if (seed) {
        template = seed;
      }
    }

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    // Build sections from template
    const sections = template.sections.map((s) => ({
      type: s.type,
      order: s.order,
      content: { ...s.defaultContent },
      visible: true,
    }));

    // Generate unique slug with retry on collision
    const baseName = `${req.user.displayName || 'my'}-portfolio`;
    const baseSlug = slugify(baseName, { lower: true, strict: true });

    let portfolio;
    let slug = baseSlug;
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        portfolio = await Portfolio.create({
          userId,
          templateId: template._id || null,
          name: `${template.name} Portfolio`,
          slug,
          status: 'draft',
          sections,
          theme: { ...template.defaultTheme },
          layout: template.layout || 'standard',
          _defaultTheme: { ...template.defaultTheme },
        });
        break;
      } catch (err) {
        if (err.code === 11000 && err.keyPattern?.slug) {
          slug = `${baseSlug}-${Date.now().toString(36)}`;
        } else {
          throw err;
        }
      }
    }

    if (!portfolio) {
      return res.status(409).json({ success: false, message: 'Could not generate unique URL. Please try again.' });
    }

    res.status(201).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
}

// GET /api/portfolios — list user's portfolios
async function listPortfolios(req, res, next) {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id, isDeleted: { $ne: true } })
      .sort({ updatedAt: -1 });
    res.json({ success: true, data: portfolios });
  } catch (error) {
    next(error);
  }
}

// GET /api/portfolios/:id — get single portfolio
async function getPortfolio(req, res, next) {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    res.json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
}

// PUT /api/portfolios/:id — update portfolio
async function updatePortfolio(req, res, next) {
  try {
    const { sections, theme, name, seo } = req.body;
    const update = {};

    if (sections !== undefined) update.sections = sections;
    if (theme !== undefined) update.theme = theme;
    if (name !== undefined) update.name = name;
    if (seo !== undefined) update.seo = seo;

    console.log('[Portfolio Update] id:', req.params.id, 'fields:', Object.keys(update), 'sections count:', update.sections?.length);

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      console.log('[Portfolio Update] NOT FOUND — id:', req.params.id, 'userId:', req.user._id);
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    console.log('[Portfolio Update] SUCCESS — saved', portfolio.sections?.length, 'sections');
    res.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('[Portfolio Update] ERROR:', error.message);
    next(error);
  }
}

// POST /api/portfolios/:id/publish — publish or unpublish
async function togglePublish(req, res, next) {
  try {
    const { slug, seo } = req.body;
    console.log('[togglePublish] id:', req.params.id, 'slug:', slug, 'seo:', JSON.stringify(seo));

    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!portfolio) {
      console.log('[togglePublish] NOT FOUND — id:', req.params.id, 'userId:', req.user._id);
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    console.log('[togglePublish] current status:', portfolio.status);

    if (portfolio.status === 'published') {
      // Unpublish
      portfolio.status = 'draft';
    } else {
      // Publish
      if (slug) {
        const sanitizedSlug = slugify(slug, { lower: true, strict: true });
        const existing = await Portfolio.findOne({ slug: sanitizedSlug, _id: { $ne: portfolio._id } });
        if (existing) {
          console.log('[togglePublish] slug taken:', sanitizedSlug);
          return res.status(400).json({ success: false, message: 'This URL is already taken' });
        }
        portfolio.slug = sanitizedSlug;
      }
      if (seo) {
        if (seo.title !== undefined) portfolio.seo.title = seo.title;
        if (seo.description !== undefined) portfolio.seo.description = seo.description;
        if (seo.ogImage !== undefined) portfolio.seo.ogImage = seo.ogImage;
        portfolio.markModified('seo');
      }
      portfolio.status = 'published';
    }

    console.log('[togglePublish] saving with status:', portfolio.status, 'slug:', portfolio.slug);
    await portfolio.save();
    console.log('[togglePublish] SUCCESS — status:', portfolio.status);
    res.json({ success: true, data: portfolio });
  } catch (error) {
    console.error('[togglePublish] ERROR:', error.message);
    next(error);
  }
}

// POST /api/portfolios/:id/duplicate — duplicate portfolio
async function duplicatePortfolio(req, res, next) {
  try {
    const original = await Portfolio.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!original) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    // Check limit
    const count = await Portfolio.countDocuments({ userId: req.user._id, isDeleted: { $ne: true } });
    if (count >= 5 && req.user.plan === 'free') {
      return res.status(403).json({ success: false, message: 'Portfolio limit reached' });
    }

    const slug = `${original.slug}-copy-${Date.now().toString(36)}`;

    const duplicate = await Portfolio.create({
      userId: req.user._id,
      templateId: original.templateId,
      name: `${original.name} (Copy)`,
      slug,
      status: 'draft',
      sections: original.sections,
      theme: original.theme,
      layout: original.layout || 'standard',
      seo: { title: '', description: '', ogImage: '' },
    });

    res.status(201).json({ success: true, data: duplicate });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/portfolios/:id — soft delete
async function deletePortfolio(req, res, next) {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isDeleted: true, deletedAt: new Date(), status: 'draft' },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    res.json({ success: true, message: 'Portfolio deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFromTemplate,
  listPortfolios,
  getPortfolio,
  updatePortfolio,
  togglePublish,
  duplicatePortfolio,
  deletePortfolio,
};
