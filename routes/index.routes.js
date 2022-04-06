const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use(require("./clients.routes"));
router.use(require("./auth.routes"));

router.use(require("./auth.routes"));
router.use(require("./admin.routes"));
module.exports = router;
