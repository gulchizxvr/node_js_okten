const express = require('express')

const app = express()

const userDB = require('./database/users')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Joi = require('joi')
const user = Joi.object({
    name: Joi.string().pattern(new RegExp('^[A-Z]{1,30}$')).required(),
    age: Joi.number().min(1).required()
})


app.listen(5000, () => {
    console.log('Listen port 5000')
})

app.get('/', (req, res) => {
    res.json("Welcome")
})


app.get('/users', (req, res) => {
    res.json(userDB)
})

app.get('/user/:id', (req, res) => {
    const {id} = req.params

    if (id < userDB.length) {
        res.json(userDB[id])
    } else {
        res.json("No find")
    }

})

app.post('/users', (req, res) => {

    const userInfo = req.body
    const {error,value} = user.validate(userInfo)

    if (!error) {
        userDB.push(value)
        res.json(`Created user ${value.name}`)
    } else {
        res.json("enter username and age")
    }
})

app.delete('/user/:id', (req, res) => {

    const {id} = req.params

    if (id < userDB.length) {
        res.json(`Delete user with name ${userDB[id]?.name}`)
        userDB.splice(id, 1)
    } else {
        res.json("Error. Write valid number")
    }
})


