const router = require('express').Router()
const controllers = require('../controllers/calendars.controller')

router.get('/event', controllers.getEvent)
router.get('/event/search', controllers.searchEvent)
router.post('/event', controllers.createEvent)
router.put('/event/:id', controllers.editEvent)

module.exports = router
