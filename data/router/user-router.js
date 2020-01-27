const router = require("express").Router();

const Users = require("../models/users");
const { validate } = require("../middleware/user-middleware");

router.get("/", (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
