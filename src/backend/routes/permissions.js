/**
 * This file provides permission validation functions for routing to sensitive endpoints
 */

/**
 * Checks if the user is currently logged in on an admin account before passing them on
 */
const requireAdmin = async (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  next();
};

/**
 * Checks if the user is logged in to either an admin or an employee account before passing them on
 */
function requireEmployee(req, res, next) {
  if (req.auth.role !== "employee" && req.auth.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }
  next();
}

module.exports = {
  requireAdmin,
  requireEmployee,
};
