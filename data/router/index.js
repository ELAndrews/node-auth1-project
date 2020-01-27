const router = require("express").Router();

const authRouter = require("./auth-router");
const userRouter = require("./user-router");

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.get("/", (req, res) => {
  res.json(`The API is working`);
});

module.exports = router;
