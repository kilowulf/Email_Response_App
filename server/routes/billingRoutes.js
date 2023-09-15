const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  // watch for post requests made to the api stripe route
  app.post("/api/stripe", async (req, res) => {
    // generate charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    console.log(charge);
  });
};
