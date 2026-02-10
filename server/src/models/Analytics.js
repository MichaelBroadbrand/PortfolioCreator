const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['view', 'contact_form'],
    default: 'view',
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  metadata: {
    referrer: String,
    userAgent: String,
    country: String,
  },
}, { timestamps: true });

// Compound index for efficient aggregation
analyticsSchema.index({ portfolioId: 1, date: 1 });
analyticsSchema.index({ portfolioId: 1, type: 1, date: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
