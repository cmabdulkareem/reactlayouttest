import express from 'express'
import cors from 'cors'
const app = express()


app.use(cors())
app.use(express.json())

let isFavourite = false

let products = [
]

app.get("/findAllProducts", (req, res) => {
    try {
        res.json(products)
    } catch (error) {
        res.json("error")
    }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})