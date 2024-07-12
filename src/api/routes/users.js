const { isAuth, isAdmin } = require('../../middlewares/auth');
const { registerUser, allUsers, deleteUser, loginUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", loginUser)
usersRoutes.get("/", [isAdmin], allUsers)
usersRoutes.delete("/delete/:id", [isAuth], deleteUser)

module.exports = usersRoutes;