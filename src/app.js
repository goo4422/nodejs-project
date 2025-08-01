const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths fro express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'example',
        name: 'purevdorj 08:01'
    })
})
app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About purevdorj',
        name: 'purevdorj'
    })
})
app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help Page',
        helpText: 'Some help text exist',
        name: 'Shinebayar Ts.'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    } else{
        geocode(address, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }
    
                console.log(location)
                console.log(forecastData)
            })
        })
    }
    res.send({
        forecast: 'It is snowing',
        location: 'Philidelphia',
        address: req.query.address
    })
})
// 🔥 CRITICAL алдаа: хэрэглэгчээс орж ирсэн query-г eval ашиглан шууд ажиллуулж байна
app.get('/danger', (req, res) => {
    if (req.query.code) {
        try {
            // Хэрэглэгчийн оруулсан JS кодыг шууд ажиллуулж байгаа нь маш аюултай
            const result = eval(req.query.code)
            res.send({ result })
        } catch (e) {
            res.status(500).send({ error: 'Invalid code' })
        }
    } else {
        res.send({ error: 'No code provided' })
    }
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }   
    res.send({
        products: []
    })
})


app.get('*',(req,res)=>{
    res.send('404 Page')
})

app.listen(3000,()=>{
  
  console.log('Server is up on port 3000')
})
