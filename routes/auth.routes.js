const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password, firstName, lastName, address, city, postcode, tax, phone } = req.body;
      const userAlreadyExists = await User.findOne({ email });
      if (userAlreadyExists) {
        return res.status(400).json({
          errorMessage: "Email already exists, please try a different one!",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = await new User({ email, password: passwordHash, firstName, lastName, address, city, postcode, tax, phone });
      await user.save();
  
      return res.json({ message: "Successfully signed up user" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errorMessage: "Something went wrong!" });
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      //console.log( req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw Error();
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw Error();
      }
  
      const sessionUser = { email: user.email, _id: user._id };
      req.session.user = sessionUser;
      //console.log(req.session);
      return res.json({ message: "Successfully logged in!", user: sessionUser });
    } catch (err) {
      //console.error(err);
      
      return res.status(400).json({
        errorMessage: "Email already exists, please try a different one!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      address,
      city,
      postcode,
      vat,
      phone,
    });
    await user.save();

    return res.json({ message: "Successfully signed up user" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: "Something went wrong!" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    //console.log( req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw Error();
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw Error();
    }

    const sessionUser = { email: user.email, _id: user._id };
    req.session.user = sessionUser;
    //console.log(req.session);
    return res.json({ message: "Successfully logged in!", user: sessionUser });
  } catch (err) {
    //console.error(err);
    return res.status(400).json({
      errorMessage: "Something went wrong - username and password don't match",
    });
  }
});

router.post("/logout", async (req, res, next) => {
  //console.log("Trying to logout!");

  req.session.destroy((err) => {
    if (err) next(err);
    return res.json({ message: "Successfully logged out!" });
  });
});

module.exports = router;
