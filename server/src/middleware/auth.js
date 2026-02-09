const { clerkMiddleware, requireAuth, getAuth, clerkClient } = require('@clerk/express');
const User = require('../models/User');

// Clerk middleware — attach auth to request
// Pass keys explicitly to avoid env var resolution issues
const clerkAuth = clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Require authenticated user
const requireAuthentication = requireAuth();

// Attach user document from MongoDB to req.user
// Auto-creates the User doc if the Clerk user exists but hasn't been synced yet
const attachUser = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth?.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    let user = await User.findOne({ clerkId: auth.userId });

    // If user doesn't exist in MongoDB, auto-create from Clerk profile
    if (!user) {
      console.log('[Auth] User not found in DB for clerkId:', auth.userId, '— auto-creating...');
      try {
        const clerkUser = await clerkClient.users.getUser(auth.userId);
        user = await User.create({
          clerkId: auth.userId,
          email: clerkUser.emailAddresses?.[0]?.emailAddress || `${auth.userId}@placeholder.local`,
          displayName: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || 'User',
          avatarUrl: clerkUser.imageUrl || '',
        });
        console.log('[Auth] Auto-created user:', user._id.toString(), user.email);
      } catch (createErr) {
        console.error('[Auth] Failed to auto-create user:', createErr.message);
        return res.status(500).json({ success: false, message: 'Failed to initialize user account' });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { clerkAuth, requireAuthentication, attachUser };
