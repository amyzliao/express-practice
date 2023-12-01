const express = require('express')
const router = express.Router()

router.use(userLogger)

// NOTE: express matches routes in order as they are defined
// so if you put /new after /:id, its going to think
// "new" is the id
// ALWAYS PUT DYNAMIC ROUTES BELOW STATIC ROUTES

router.get('/', (req, res) => {
    res.send('user list')
})

router.get('/new', (req, res) => {
    res.send('user new form')
})

router.post('/', (req, res) => {
    res.send('create user')
})

// url params
// use .route if endpoints share the same url
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`GET user with id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`PUT user with id ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`DELETE user with id ${req.params.id}`)
    })

const users = [
    { name: "Kyle" },
    { name: "Sam" }
]

// .param is a type of middleware - it runs btwn the req
// being sent to server and response being sent back
// to user
// .param runs the function whenever it sees an "id" param,
// before anything else (incl endpoints that use it)
router.param("id", (req, res, next, id) => {
    // add a field to req obj
    req.user = users[id]
    console.log(id)
    next() // continues to the endpoint
})

function userLogger(req,res,next) {
    console.log('user logger')
    next()
}

module.exports = router