const userModel = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config
let secret = process.env.SECRET
const cloudinary = require("cloudinary")

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

const welcomeUser = (req, res) => {
    res.send("Welcome to the user page")
}


const about = (req, res) => {
    res.send("Welcome to the about page")
}

const register = (req, res) => {
    res.send("Welcome to the register page")
}

const login = (req, res) => {
    res.send("Welcome to the login page")
}

const registerUser = async (req, res) => {
    let saltRound = 10 
    const {firstName, lastName, email, password} = req.body
    const plaintextPassword = password;
    // console.log(req.body);
    const hashedPassword = bcrypt.hashSync(plaintextPassword, saltRound);
    let user = new userModel ({firstName, lastName, email, password:hashedPassword})
    user.save()
    .then((response)=>{
            console.log(response);
            console.log("user saved successfully");
            res.status(201).json({Message: 'sucessfull registered'})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({Message: 'Erroor occurred'})

    })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body);

    let user; 
    try {
        user = await userModel.findOne({ email: email });
        console.log('User:', user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ Message: 'Internal Server Error' });
    }

    if (!user) {
        console.log('User not found');
        return res.status(200).json({ Message: 'User not found, please sign up' });
    }

    // const userInputPassword = "userInputPassword123";
    const correctPassword = bcrypt.compareSync(password, user.password);
    console.log('Correct password:', correctPassword);

    if (!correctPassword) {
        console.log('Wrong password');
        return res.status(400).json({ Message: 'Wrong login details' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "2day" });
    console.log('Token:', token);

    res.status(200).json({
        Message: 'Login successful',
        token: token,
        user: user,
        status: 200
    });
    console.log("Login successful");
};

const dashboard = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        const userId = decoded.id;

        // Assuming userModel represents your Mongoose model for users
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Send user information as response
        return res.status(200).json({ status: true, message: "User found", user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

const uploadProfile = async (req, res) => {
    let file =req.body.myFile;

    cloudinary.uploader.upload(file, (result, error) => {
        if(error)
         {
            console.log(error);
        }else{
            console.log(result);
            res.send({status: true, message: "suucessfully uploaded", result});
        }
    })
}

const uploadImage = async (req, res) => {
  try {
    const imageData = req.body.imageData;
    const image = new Image({ imageData });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const dashboard = async (req, res) => {
    // console.log(req.body);
    // let token = req.headers.authorization.split(" ")[1]
    // console.log(token);
    // jwt.verify(token, secret, (err, result) => {
        // if (err) {
            // console.log(err);
            // res.send({status: false, message: "Invalid token", result})
        // }else{
            // console.log(result);
            // res.send({status: true, message: "Welcome", result})
        // }
    // })
// }

// user.controller.js

// const getUserData = async (req, res) => {
//   try {
    // const users = await userModel.find();
    // res.status(200).json(users);
//   } catch (error) {
    // console.error('Error fetching user data:', error);
    // res.status(500).json({ message: 'Error fetching user data' });
//   }
// };



module.exports = {welcomeUser, about, login, register, registerUser, loginUser, dashboard, uploadProfile, uploadImage}
