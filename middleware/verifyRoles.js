const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roles = req.roles;
    if (!roles) return res.status(401).json({ message: "no user roles found" });
    const rolesArrays = [...allowedRoles];
    console.log(roles); //
    console.log(rolesArrays); //
    const result = roles
      .map((role) => rolesArrays.includes(role))
      .find((val) => val === true);
    console.log(result); //
    if (!result)
      return res.status(401).json({ message: "invalid role access" });
    next();
  };
};

module.exports = verifyRoles;
