const _ = require('lodash')
const { validationResult } = require('express-validator')
const Restaurant = require('../models/restaurant-model')

const restaurantCtrl = {}

restaurantCtrl.register = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const body = _.pick(req.body, ['name', 'address', 'description', 'gstNo', 'licenseNumber'])
        const restaurant = new Restaurant(body)
        restaurant.ownerId = req.user.id

        await restaurant.save()

        res.status(201).json(restaurant)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }

},



module.exports = restaurantCtrl;
