const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;

    const filtered = users.filter(val => {
      return val.username === username && val.password === password;
    });

    if (filtered.length) {
      req.session.user.username = filtered[0].username;
      res.status(200).json(req.session.user);
    } else {
      res.status(500).json("Unauthorized");
    }
  },
  register: (req, res, next) => {
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;
    req.session.user.username = username;
    res.status(200).json(req.session.user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).json();
  },
  getUser: (req, res, next) => {
    const { session } = req;
    res.status(200).json(session.user);
  }
};
