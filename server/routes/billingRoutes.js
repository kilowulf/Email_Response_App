const keys = require("../config/prod");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  // watch for post requests made to the api stripe route
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // RequireLogin: ensure user is authenticated before accessing the api

    // generate charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    // reference the user object
    req.user.credits += 5;
    // save data changes to the user object
    const user = await req.user.save();
    // send the user object back to the client
    res.send(user);
  });
};
