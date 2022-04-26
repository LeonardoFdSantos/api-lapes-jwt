const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isOverlord = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Overlord") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Overlord Role!"
      });
      return;
    });
  });
};

isProfessor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Professor") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Professor Role!"
      });
    });
  });
};

isAluno_Doutorado = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Aluno_Doutorado") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Aluno Doutorado Role!"
        });
      });
    });
  };

isAluno_Mestrado = (req, res, next) => {
User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Aluno_Mestrado") {
        next();
        return;
        }
    }
    res.status(403).send({
        message: "Require Aluno Mestrado Role!"
    });
    });
});
};

isAluno_IC = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Aluno_IC") {
            next();
            return;
            }
        }
        res.status(403).send({
            message: "Require Aluno IC Role!"
        });
        });
    });
    };

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Overlord") {
          next();
          return;
        }
        if (roles[i].name === "Professor") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isOverlord: isOverlord,
  isProfessor: isProfessor,
  isAluno_Doutorado: isAluno_Doutorado,
  isAluno_Mestrado: isAluno_Mestrado,
  isAluno_IC: isAluno_IC,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;