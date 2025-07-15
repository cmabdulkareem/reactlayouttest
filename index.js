import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const app = express()

app.use(cors())
app.use(express.json())


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
        return res.status(200).json({userName: foundUser.name, role: foundUser.role, email: foundUser.email, message: "Login success" })
    } catch (error) {
        res.status(500).json("internal server error")
    }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})