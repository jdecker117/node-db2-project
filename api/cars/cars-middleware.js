const Cars = require('../cars/cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
  .then(result => {
    if(!result){
      res.status(404).json({message: `car with id ${req.params.id} is not found`})
    }
    else{
      req.car = result;
      next();
    }
  })
  .catch(err => next(err))
}

const checkCarPayload = (req, res, next) => {
  if(req.body.vin == null){
      res.status(400).json({message: `${req.body.vin} is missing`})
     }
  else if(req.body.make == null){
    res.status(400).json({message: `${req.body.make} is missing`})
  }
  else if(req.body.model == null){
    res.status(400).json({message: `${req.body.model} is missing`})
  }
  else if(req.body.mileage == null){
    res.status(400).json({message: `${req.body.mileage} is missing`})
  }
  else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(!vinValidator.validate(req.body.vin)){
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
  else{
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existing = await db('cars').where('vin', req.body.vin).first()
    if(existing){
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
    else{
      next()
    }
  } catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
