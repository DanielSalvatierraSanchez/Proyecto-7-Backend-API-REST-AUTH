const { isAdmin } = require('../../middlewares/isAdmin');
const { isAuth } = require('../../middlewares/isAuth');
const { registerUser, loginUser, allUsers, updateUsers, deleteUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", loginUser)
usersRoutes.get("/", allUsers)
usersRoutes.put("/update/:id", updateUsers)
usersRoutes.delete("/delete/:id", deleteUser)

module.exports = usersRoutes;