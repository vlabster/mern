const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {

        //DB connection
        await mongoose.connect(config.get('mongo_url'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        //Start server
        app.listen(PORT, () => {
            console.log(`Hello world on ${PORT} port.`)
        })

    } catch (e) {
        console.log('Server error!', e.message)
        process.exit(1)
    }
}



start()