const { isAuth } = require('../../middlewares/isAuth');
const { registerUser, loginUser, allUsers, updateUsers, deleteUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", loginUser)
usersRoutes.get("/", isAuth, allUsers)
usersRoutes.put("/update/:id", isAuth, updateUsers)
usersRoutes.delete("/delete/:id", isAuth, deleteUser)

module.exports = usersRoutes;