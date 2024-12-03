const express = require ('express')
const mongoose = require ('mongoose')
const shortUrl = require ('./models/shortUrl')
const app = express();
const {config} = require("dotenv")
config()


mongoose.connect(process.env.MONGODB_URL, {dbName: "shortUrl"})
.then(() => {
    console.log("connected to mongodb")
})
.catch((error) => {
    console.log(`Error connecting to mongodb: ${error.message}`)
})
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find()
    res.render('index', {shortUrls:shortUrls});
})

// to create the end shortUrl endpoints
app.post('/shortUrls', async(req, res) =>{
    await shortUrl.create({long: req.body.longUrl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res)=>{
    const shortUrls = await shortUrl.findOne({ short: req.params.shortUrl})
    if (shortUrls == null) return res.sendStatus(404)

    shortUrls.clicks++
    shortUrls.save()
    
    res.redirect(shortUrls.long)
})

const port = 3000;

app.listen(port, function (){
    console.log(`server is running at ${port}`);
});
