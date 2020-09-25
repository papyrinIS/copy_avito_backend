const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const Ad = require('../models/Ad')





const router = Router()

router.post(
    '/ad',
    async (req, res) => {
        try {
            const {title, userId,userName, address, email, phone, description, price, date,photo} = req.body
            const ad = new Ad({title, userId, address, email, phone, description, price, date, photo,userName})
            await ad.save()
            res.status(201).json({message: 'объявление создано',isAddedAd:true})
        } catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
)

router.get(
    '/ad',
    async (req, res) => {
        try {
            const ads = await Ad.find({})
            res.status(201).json(ads)
        } catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
)
router.get(
    '/user/:id',
    auth,
    async (req, res) => {
        try {
            const myAds = await Ad.find({userId: req.params.userId})
            res.status(201).json(myAds)
        } catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
)
router.get(
    '/ad/:id',
    async (req, res) => {
        try {
            const oneAd = await Ad.findById(req.params.id)
            res.status(201).json(oneAd)
        } catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
)

router.delete(
    '/ad/:adId',
    async (req,res)=>{
        try{
            await Ad.deleteOne({_id:req.params.adId})
            res.status(201).json({message:'объявление удалено',isDeleted:true})
        }catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
)

router.put(
    '/ad',
    async (req,res)=>{
        try{
            const {adId,form}=req.body
            await Ad.replaceOne({_id:adId},form)
            res.status(201).json({message:'объявление отредактировано',isEditAd:true})
        }catch (e) {
            res.status(500).json({message: 'что-то пошло не так...'})
        }
    }
    )

module.exports = router