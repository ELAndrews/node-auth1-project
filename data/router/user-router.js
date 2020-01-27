const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const {
  validateRequestFullBody,
  validateUsername
} = require("../middleware/user-middleware");

router.get("/users", validateRequestFullBody, validateUsername, (req, res) => {
  let { username, password } = req.body;
  Users.login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        Users.getUsers()
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        res.status(401).json(`You shall not pass!`);
      }
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = router;
