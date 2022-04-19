const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, firstName, lastName } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw Error();
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw Error();
    }

    const sessionUser = {
      email: user.email,
      _id: user._id,
      userType: user.userType,
    };
    req.session.user = sessionUser;
    return res.json({ message: "Successfully logged in!", user: sessionUser });
  } catch (err) {
    return res.status(400).json({
      errorMessage: "Something went wrong - email or password don't match",
    });
  }
});

router.post("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    return res.json({ message: "Successfully logged out!" });
  });
});

module.exports = router;
