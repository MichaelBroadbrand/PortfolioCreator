const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

exports.getProfile = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { displayName, bio, avatarUrl, emailNotifications } = req.body;
    const updates = {};

    if (displayName !== undefined) updates.displayName = displayName;
    if (bio !== undefined) updates.bio = bio.slice(0, 500);
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
    if (emailNotifications !== undefined) updates.emailNotifications = emailNotifications;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    // Soft-delete all portfolios
    await Portfolio.updateMany(
      { userId: req.user._id },
      { isDeleted: true, deletedAt: new Date() }
    );

    // Delete user
    await User.findByIdAndDelete(req.user._id);

    res.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};
