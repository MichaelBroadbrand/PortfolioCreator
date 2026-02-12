const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    plan: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free',
    },
    lsCustomerId: {
      type: String,
      default: null,
      index: true,
      sparse: true,
    },
    lsSubscriptionId: {
      type: String,
      default: null,
    },
    customerPortalUrl: {
      type: String,
      default: null,
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'unpaid', 'trialing', null],
      default: null,
    },
    emailNotifications: {
      contactForm: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: true },
      productUpdates: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
