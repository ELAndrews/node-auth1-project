const router = require("express").Router();
const Users = require("../models/users");
const { protectedRoute } = require("../middleware/user-middleware");

router.get("/users", protectedRoute, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
