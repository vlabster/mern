const { Router } = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
    try {

        const baseUrl = config.get('base_url')
        const { from } = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({ from })

        if (existing) {

            // if (existing.owner === req.user.userId) {
            res.json({ link: existing })
            return
            // }
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })


    } 
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз', error: e.message })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find(({ owner: req.user.userId }))
        res.json(links)
    } 
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) //????

        //Сам добавил, если ссылка чужая = нельзя смотреть статистику (но это может плохо работать если разные пользователи создадут одну и ту же ссылку, щас протестим)
        // if(link.owner !== req.user.userId) {
        //     res.status(404).json({ message: 'Ссылка не найдена' })
        //     return
        // }

        res.json(link)
    } 
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {

        const link = await Link.findById(req.params.id) //????

        if(link.owner !== req.user.userId) {
            res.status(404).json({ message: 'Ошибка удаления ссылки' })
            return
        }

        const deleteLink = await link.deleteOne({id: req.params.id})
        
        res.json(link)
    } 
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте ещё раз' })
    }
})

module.exports = router