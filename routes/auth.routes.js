const { Router } = require('express')
const User = require('../models/User')
const router = new Router()

// /api/auth/register
router.post('/register', async(req, res) => {
    try {
        const { email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' })
            return
        }

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз' })
    }
})

// /api/auth/login
router.post('/login', async(req, res) => {

})

module.exports = router