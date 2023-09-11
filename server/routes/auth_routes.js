const passport = require("passport");

module.exports = app => {
  // http get to authenticate, passport authentication using profile, email
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // route for auth/google/callback: after authentication has taken place by google
  app.get("/auth/google/callback", passport.authenticate("google"));

  // log-out route
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
