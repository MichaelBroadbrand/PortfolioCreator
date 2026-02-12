const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['developer', 'designer', 'freelancer', 'minimal', 'creative', 'neon', 'sunset', 'brutalist', 'ocean', 'pastel', 'noir', 'ember', 'architect', 'candy', 'midnight', 'terracotta', 'graphite', 'aurora', 'ivory', 'volt'],
      required: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    previewData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sections: [
      {
        type: {
          type: String,
          enum: ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'testimonials', 'custom'],
          required: true,
        },
        order: { type: Number, required: true },
        defaultContent: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],
    defaultTheme: {
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
    layout: {
      type: String,
      enum: ['sidebar', 'immersive', 'split', 'standard', 'grid', 'showcase', 'magazine', 'cards', 'blueprint', 'technical'],
      default: 'standard',
    },
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Template', templateSchema);
