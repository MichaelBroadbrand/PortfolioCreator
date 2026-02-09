const Template = require('../models/Template');
const { templates: seedTemplates } = require('../seeds/templates');

// GET /api/templates — list all templates
async function listTemplates(req, res, next) {
  try {
    const { category, sort } = req.query;

    // Try MongoDB first, fall back to seed data
    let templates;
    try {
      const query = category && category !== 'all' ? { category } : {};
      const sortOption = sort === 'newest' ? { createdAt: -1 } : { popularity: -1 };
      templates = await Template.find(query).sort(sortOption);
    } catch {
      // MongoDB not available — use seed data
      templates = seedTemplates;
      if (category && category !== 'all') {
        templates = templates.filter((t) => t.category === category);
      }
      if (sort === 'newest') {
        templates = [...templates].reverse();
      }
    }

    res.json({ success: true, data: templates });
  } catch (error) {
    next(error);
  }
}

// GET /api/templates/:id — get single template
async function getTemplate(req, res, next) {
  try {
    let template;
    try {
      template = await Template.findById(req.params.id);
    } catch {
      // Fall back to seed data by index or name
      const idx = parseInt(req.params.id);
      template = !isNaN(idx) ? seedTemplates[idx] : seedTemplates.find((t) => t.name.toLowerCase() === req.params.id.toLowerCase());
    }

    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    res.json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
}

module.exports = { listTemplates, getTemplate };
