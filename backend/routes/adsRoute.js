const express = require('express')
const router = express.Router()
const Ads = require('../model/adsModel')

router.get('/', async (req,res) => {
    try {
        const ads = await Ads.find()
        res.send(ads)
    } catch (error) {
        res.send(error)   
    }
})


router.post('/insert', async(req, res ) => {
    const { form } = req.body
    console.log(req.body)
    // console.log('back',req.body)
    try {
      const ads = new Ads(req.body)  
      await ads.save()
      res.send({ message: 'ad posted '})
    } catch (error) {
        res.send({ message: error})
    }
})


router.get('/single/:id', async(req,res) => {
    id = req.params.id
    console.log(id)
    try {
        const ads = await Ads.findById(id)
        res.send(ads)
    } catch (error) {
        res.send({ message: error})
    }
})
module.exports = router