const router = require("express").Router();
const Users = require("../models/users");
const { adminProtectedRoute } = require("../middleware/user-middleware");

router.get("/users", adminProtectedRoute, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/users/:id", adminProtectedRoute, (req, res) => {
  Users.getUserById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/users/:id", adminProtectedRoute, (req, res) => {
  Users.removeUserById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
