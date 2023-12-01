const express = require('express');
const app = express()

// use a view engine
app.set('view engine', 'ejs')

// next is the next function - most of the time we won't use
// app.get('/', (request, response, next) => {})
// app.post
// app.put
// app.delete

// you can have middleware apply only to one endpoint like this
// you can pass as many functions here as possible, they will
// run one after the other
app.get('/', getLogger, getLogger,getLogger,(req, res) => {
    // just send a status code
    //   res.sendStatus(500)

    // send is not the most useful or something
    //   res.send('hi')

    // send both code and msg
    // res.status(500).send('hi')

    // send code and json obj
    // res.status(500).json({ message: "Error"})

    // this default sends success code
    // res.json({ message: "Error"})

    // send file to user to download
    // res.download("server.js")

    // render html file
    res.render('index', { textsdfds: 'World' })
})

// code runs top-down; so everything under the logger
// uses the logger
app.use(logger)


// router groups endpoints
const userRouter = require('./routes/users')

app.use('/users', userRouter)

// make a middleware that logs the urls that are called
function logger(req,res,next) {
    console.log(req.originalUrl)
    next()
}

function getLogger(req,res,next) {
    console.log('pepe')
    next()
}

app.listen(3000)