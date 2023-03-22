/**
 * This file provides permission validation functions for routing to sensitive endpoints
 */


const requireAdmin = async (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).send({ error: "Forbidden" });
  }

  next();
};

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
