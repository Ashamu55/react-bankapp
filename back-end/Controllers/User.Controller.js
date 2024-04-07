const userModel = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config
let secret = process.env.SECRET

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

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 10 });
    console.log('Token:', token);

    res.status(200).json({
        Message: 'Login successful',
        token: token,
        user: user
    });
    console.log("Login successful");
};

const dashboard = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1]
    console.log(token);
    jwt.verify(token, secret, (err, result) => {
        if (err) {
            console.log(err);
            res.send({status: false, message: "Invalid token", result})
        }else{
            console.log(result);
            res.send({status: true, message: "Welcome", result})
        }
    })
}


module.exports = {welcomeUser, about, login, register, registerUser, loginUser, dashboard}
