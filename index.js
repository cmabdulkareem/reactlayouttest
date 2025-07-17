import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',    // Replace with your frontend URL
    credentials: true,                  // Enable sending cookies
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // Allowed HTTP methods from the frontend
    allowedHeaders: ['Content-Type', 'Authorization'],   // Allowed headers from the frontend
}))
app.use(express.json())
app.use(cookieParser())


mongoose.connect('mongodb://127.0.0.1:27017/ecomapp')
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err))

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "user" }
})

const User = mongoose.model('User', UserSchema)

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (!name || !email || !password) {
            return res.status(400).json("All fields are required")
        }
        let foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(400).json("User already exists")
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = await User.create({ name, email, password: hashedPassword })
        return res.status(200).json({userName: user.name, role: user.role, email: user.email, message: "User created successfully" })
    } catch (error) {
        res.status(500).json("internal server error")
    }
})


app.post('/login', async(req, res) => {
    const {email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json("All fields are required")
        }
        let foundUser = await User.findOne({ email })
        if (!foundUser) {
            return res.status(400).json("no user found with this email")
        }
        let passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            return res.status(400).json("Incorrect password")
        }
        jwt.sign({user: foundUser.email}, "secretkey", (err, token) => {
            res.cookie("token", token, {httpOnly: true, secure: false, sameSite: "none"})
            return res.status(200).json({userName: foundUser.name, role: foundUser.role, email: foundUser.email, message: "Login success" })
        })
    } catch (error) {
        res.status(500).json("internal server error")
    }
})

// jwt verification middleware function
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json("Unauthorized")
    }
    jwt.verify(token, "secretkey", (err, user) => {
        if (err) {
            return res.status(401).json("Unauthorized")
        }
        req.user = user
        // req.user will add the logged in user to the request
        next()
    })
}

app.get('/userInfo', verifyToken, async(req, res) => {
    try {
        const user = await User.findOne({ email: req.user.user })
        console.log(user)
        return res.status(200).json({role: user.role, email: user.email})
    } catch (error) {
        res.status(500).json("internal server error")
    }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})