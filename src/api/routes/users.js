const { isAuth } = require('../../middlewares/isAuth');
const { registerUser, allUsers, deleteUser, loginUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", loginUser)
usersRoutes.get("/", [isAuth], allUsers)
usersRoutes.delete("/delete/:id", [isAuth], deleteUser)

module.exports = usersRoutes;