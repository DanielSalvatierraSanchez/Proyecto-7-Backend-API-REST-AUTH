const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, minLength: 1, maxLength: 25 },
        email: { type: String, required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { type: String, required: true, //minLength: 8, maxLength: 25 
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

userSchema.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, 10)
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;