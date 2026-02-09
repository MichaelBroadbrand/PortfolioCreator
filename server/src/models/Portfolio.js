const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'testimonials', 'custom'],
      required: true,
    },
    order: { type: Number, required: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    visible: { type: Boolean, default: true },
  },
  { _id: true }
);

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },
    name: {
      type: String,
      required: true,
      default: 'My Portfolio',
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    sections: [sectionSchema],
    theme: {
      colorScheme: {
        primary: { type: String, default: '#6366f1' },
        secondary: { type: String, default: '#4f46e5' },
        accent: { type: String, default: '#f59e0b' },
        background: { type: String, default: '#ffffff' },
        text: { type: String, default: '#111827' },
      },
      fontPairing: { type: String, default: 'Inter + DM Sans' },
      mode: { type: String, enum: ['light', 'dark'], default: 'light' },
      spacing: { type: String, enum: ['compact', 'normal', 'spacious'], default: 'normal' },
    },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    customDomain: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Don't return soft-deleted portfolios by default
portfolioSchema.pre(/^find/, function () {
  if (!this.getQuery().isDeleted) {
    this.where({ isDeleted: { $ne: true } });
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
