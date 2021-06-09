const { Router } = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const router = new Router()

// /api/auth/register
router.post(
    '/register', [
        check('email', 'Некорректрный email').isEmail(),
        check('password', 'Минимальная длинна пароля - 6 символов').isLength({ min: 6 })
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req)

            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неккоректные данные при регистрации'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' })
                return
            }

            const hashPass = await bcrypt.hash(password, 12)

            const user = new User({ email, password: hashPass })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз' })
        }
    })

// /api/auth/login
router.post('/login', async(req, res) => {

})

module.exports = router