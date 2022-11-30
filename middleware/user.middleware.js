const {fileService} = require('../services')

const ApiError = require('../error/ApiError')

module.exports = {
    checkIsUserExist: async (req, res, next) => {
        try {
            const {userId} = req.params

            const users = await fileService.reader()
            const user = users.find((user) => user.id === +userId)
            if (!user) {
                throw new ApiError('Check what you writing', 404)
            }

            req.users = users
            req.user = user
            next()
        } catch (e) {
            next(e)
        }
    },
    isBodyValidCreate: (req, res, next) => {
        try {
            const {name, age} = req.body
            if (!name || name.length < 3 || typeof name !== "string") {
                throw new ApiError('Wrong name', 400)
            }
            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Wrong age', 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}