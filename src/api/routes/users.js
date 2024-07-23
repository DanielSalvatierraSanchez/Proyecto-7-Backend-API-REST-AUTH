const { isAuth } = require('../../middlewares/isAuth');
const { registerUser, loginUser, allUsers, updateUser, deleteUser } = require('../controllers/users');

const usersRoutes = require('express').Router();

usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", loginUser)
usersRoutes.get("/", isAuth, allUsers)
usersRoutes.put("/update/:id", isAuth, updateUser)
usersRoutes.delete("/delete/:id", isAuth, deleteUser)

module.exports = usersRoutes;