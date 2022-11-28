const express = require('express')
const {fileService} = require("./services")

const app = express()


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


app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users)
})

app.get('/user/:id', async (req, res) => {
    const {id} = req.params

    const users = await fileService.reader()
    const index = users.findIndex((user) => user.id === +id)


    if (index === -1) {
        return res.status(404).json('Not found')
    }

    const user = users[index]
    res.json(user)
})

app.post('/users', async (req, res) => {

    const userInfo = req.body
    const {error, value} = user.validate(userInfo)

    if (error) {
        return res.json("enter username and age")
    }

    const users = await fileService.reader()

    const newUser = {
        name: value.name,
        age: value.age,
        id: users.length ? +users[users.length - 1].id + 1 : 1
    }

    users.push(newUser)
    await fileService.writer(users)

    res.json(`Created user ${value.name}`)


})

app.delete('/user/:id', async (req, res) => {

    const {id} = req.params

    const users = await fileService.reader()

    const index = users.findIndex((user) => user.id === +id)

    if (index === -1) {
        return res.json("Error. Write valid number")
    }

    res.json(`Delete user with name ${users[index]?.name}`)
    users.splice(index, 1)
    await fileService.writer(users)


})


