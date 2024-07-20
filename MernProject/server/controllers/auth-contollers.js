const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


const home = async (req, res) => {
    try{
        res.status(200).json({msg:"Welcome to MERN "});

    } catch(error) {
        console.log(error);

    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
       const { username, email, phone, password } = req.body;
        
       const userExist = await User.findOne({email});

       if (userExist) {
        return res.status(400).json({msg: "Email Already Exist"});

       }


       const userCreated =  await User.create({ username, email, phone, password});
       
       res.status(201).json({
         msg : "registration Successfully",
          token: await userCreated.generateToken(),
         userId: userCreated._id.toString(),
    
    });




    } catch(error) {
        res.status(400).json("Page Not Found");

    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne( {email});
        console.log(userExist);

        if(!userExist)
        {
            return res.status(400).json({msg: "User Already Exist"});

        }

        const user = await bcrypt.compare(password, userExist.password);
    
        if(user) {
            res.status(201).json({
                msg : "registration Successfully",
                 token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
        });}
        else{
            res.status(401).json({message: "Invalid email or password"});
        }

    } catch(error) {
        res.status(400).json("Page Not Found");

    }};
    
module.exports= { home, register, login };