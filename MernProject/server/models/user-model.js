const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true,
    },
    email: {
        type : String,
        require : true,
    },
    phone: {
        type : String,
        require : true,
    },
    password: {
        type : String,
        require : true,
    },
    IsAdmin: {
        type : Boolean,
        require : false,
    },
}

);

//secure password
userSchema.pre('save', async function (next) {
    const user =this;

    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRound =await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
        
    }
});

userSchema.methods.generateToken = async function () {

    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            IsAdmin: this.IsAdmin,
            
            
        },
        process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        
    }
};

//define model or collection

const User = new mongoose.model("User", userSchema);
module.exports = User;