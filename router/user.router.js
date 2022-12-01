const router = require('express').Router()

const controller = require('../controller/user.controller')
const mdlwr = require("../middleware/user.middleware");

router.get(
    '/',
    controller.getAllUser)

router.post(
    '/',
    mdlwr.isBodyValidCreate,
    controller.createUser)

router.get(
    '/:userId',
    mdlwr.isIdValid,
    mdlwr.checkIsUserExist,
    controller.getUserById)


router.delete(
    '/:userId',
    mdlwr.isIdValid,
    mdlwr.checkIsUserExist,
    controller.deleteUser)

router.put(
    '/:userId',
    mdlwr.isIdValid,
    mdlwr.isBodyValidUpdate,
    mdlwr.checkIsUserExist,
    controller.updateUser)

module.exports = router