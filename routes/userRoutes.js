const express = require('express')
const router = express.Router()
const {createUser, updateUser, deleteUser, getUser} = require("../controller/userController")

router.route('/').post(createUser)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/').get(getUser)




module.exports = router