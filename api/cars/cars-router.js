const router = require('express').Router()
const Cars = require('./cars-model')
const {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware')

router.get('/', (req, res) => {
    Cars.getAll()
    .then(result => {
        res.status(200).json(result)
    })
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car)
})

router.post('/', checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique, 
(req, res) => {
   Cars.create(req.body)
   .then(result => {
    console.log(result)
   }) 
})

module.exports = router