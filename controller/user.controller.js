const {fileService} = require('../services')


module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const users = await fileService.reader()
            res.json(users)
        } catch (e) {
            next(e)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            res.json(req.user)
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const userInfo = req.body
            const users = await fileService.reader()

            const newUser = {
                name: userInfo.name,
                age: userInfo.age,
                id: users.length ? +users[users.length - 1].id + 1 : 1
            }
            users.push(newUser)
            await fileService.writer(users)

            res.json(`Created user ${userInfo.name}`)
        } catch (e) {
            next(e)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {user, users} = req
            const index = users.findIndex((u) => u.id === user.id)

            users.splice(index, 1)

            await fileService.writer(users)
            res.sendStatus(204)

        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user, users, body} = req
            const index = users.findIndex((u) => u.id === user.id)

            users[index] = {...users[index], ...body}

            await fileService.writer(users)
            res.status(201).json(users[index])

        } catch (e) {
            next(e)
        }
    }

}
