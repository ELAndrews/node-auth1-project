const router = require("express").Router();
const Users = require("../models/users");
const {
  userProtectedRoute,
  adminProtectedRoute
} = require("../middleware/user-middleware");

router.get("/users", adminProtectedRoute, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
