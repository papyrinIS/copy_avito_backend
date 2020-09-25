const express =require('express')
const config = require('config')
const mongoose =require('mongoose')
const bodyParser=require('body-parser')


const app =express()

app.use(express.json({ limit: '50mb' ,extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/auth.route'))
app.use(require('./routes/ad.route'))
const PORT = config.get('port') || 5000


async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT,()=>console.log(`server started,port:${PORT}`))
    }catch(e){
        console.log('server error,',e.message)
        process.exit(1)
    }
}

start()