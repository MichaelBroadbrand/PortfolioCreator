/**
 * Middleware factory that requires a specific plan level.
 * Must be used AFTER attachUser middleware.
 */
function requirePlan(plan) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (req.user.plan !== plan) {
      return res.status(403).json({
        success: false,
        message: `This feature requires the ${plan} plan.`,
        code: 'PLAN_REQUIRED',
        requiredPlan: plan,
      });
    }

    next();
  };
}

module.exports = { requirePlan };
