import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/ecomapp')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'admin'
    }
})

const User = mongoose.model('User', userSchema)

const productSchema = new mongoose.Schema({
    itemName: String,
    itemDesc: String,
    itemPrice: Number
})

const Product = mongoose.model('Product', productSchema)

app.post('/register', async (req, res) => {
    const {name, email, password } = req.body
    try {
        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please enter all fields'})
        }
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword })
        res.status(201).json("User created successfully")
    } catch (error) {
        res.json(error)
    }
})

app.post('/login', async (req, res)=>{
    const { email, password } = req.body
    try {
        const foundUser = await User.findOne({ email })
        if(!foundUser) {
            return res.status(400).json({message: 'User does not exist'})
        }
        const pwdMatch = await bcrypt.compare(password, foundUser.password)
        if(!pwdMatch) {
            return res.status(400).json({message: 'Incorrect password'})
        }
        const token = jwt.sign({id: foundUser._id}, 'secret')
        res.cookie('token', token, {httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24 * 60 * 60 * 1000})
        res.status(200).json({user: {name: foundUser.name, email: foundUser.email, role: foundUser.role}, token})
    } catch (error) {
        res.json(error)
    }
})

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'secret'); // same secret used to sign
    req.user = decoded; // Add user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.get('/userinfo', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('token', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  });
  res.status(200).json({ message: "Logged out" });
});

app.post('/addproduct', verifyToken, async (req, res) => {
  try {
    const { itemName, itemDesc, itemPrice } = req.body
    const itemImage = req.files?.itemImage

    if (!itemImage) {
      return res.status(400).json({ error: "Please upload product image" })
    }

    if (!itemName || !itemDesc || !itemPrice) {
      return res.status(400).json({ error: "All fields are required" })
    }

    // Create the product first
    const newProduct = await Product.create({ itemName, itemDesc, itemPrice })

    // Build the image path
    const imageDir = path.join(__dirname, 'public', 'images', 'products')
    const imagePath = path.join(imageDir, `${newProduct._id}.jpg`)

    // Move the image
    await itemImage.mv(imagePath)

    res.status(200).json({ message: "Product uploaded successfully", productId: newProduct._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get('/findAllProducts' , async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal server error" })
  }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})