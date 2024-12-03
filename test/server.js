const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan("tiny"))

const port = 3000

app.get("/", async(req, res) => {
    return res.status(200).json({"message": "app is up and running .."})
})

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`)
})