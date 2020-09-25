const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


router.post(
    '/register',
    [
        check('login','некорректный email').isEmail(),
        check('password','минимальная длинна пароля 6 символов').isLength({min:6})
    ],
    async (req,res)=>{
    try{
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'некорректные данные при регистрации'
            })
        }


        const {login,userName,password} =req.body
        console.log(login,userName,password)


        const candidate = await User.findOne({login})
        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ login, userName, password: hashedPassword })
        console.log('user:',user)
        await user.save()


        res.status(201).json({ message: 'Пользователь создан',isRegistered:true})

    }catch (e) {
        res.status(500).json({message:'что-то пошло не так...'})
    }
})
router.post('/login',
    [
        check('login','введите корректный email').normalizeEmail().isEmail(),
        check('password','пустой пароль').exists()
    ],
    async (req,res)=>{
        try{
            const errors=validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:errors.array(),
                    message:'некорректные данные при входе'
                })
            }
            const {login,password} =req.body

            const user = await User.findOne({login})

            if(!user){
                return res.status(400).json({message:'пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({message:'неверный пароль'})
            }

            const token =jwt.sign(
                { userId:user.id },
                config.get('jwtSecret'),
                {expiresIn:'999h'}
            )
            res.json({token,userId:user.id,isAuth:true,userName:user.userName})

        }catch (e) {
            res.status(500).json({message:'что-то пошло не так...'})
        }

})


module.exports=router


