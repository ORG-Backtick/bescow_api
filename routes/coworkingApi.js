const express = require('express');
const passport = require('passport');
const authValidationHandler = require('../utils/middleware/authValidationHandler');
const CoworkingService = require('../services/coworking');
require('../utils/auth/strategies/jwt');

const coworkingApi = (app) => {
  const router = express.Router();
  app.use('/api/coworking', router);

  const coworkingService = new CoworkingService();

  router.get('/', async (req, res, next) => {
    try {
      const coworkingList = await coworkingService.getCoworkingAll();
      res.status(200).json({
        data: coworkingList,
        message: 'Coworking list listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:cowId', async (req, res, next) => {
    const { cowId } = req.params;

    try {
      const cow = await coworkingService.getCoworkingById({ cowId });
      res.status(200).json({
        data: cow,
        message: 'Cow retrived'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/add', passport.authenticate('jwt', {session: false}), authValidationHandler(), async (req, res, next) => {
    const { body: cow } = req;

    try {
      const createdCowId = await coworkingService.createCow({ cow });
      res.status(201).json({
        data: createdCowId,
        message: 'Cow created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:cowId', passport.authenticate('jwt', {session: false}), authValidationHandler(), async (req, res, next) => {
    const { cowId } = req.params;
    const { body: cow } = req;

    try {
      const updatedCowId = await coworkingService.updateCow({ cowId, cow});
      res.status(200).json({
        data: updatedCowId,
        message: 'Cow updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:cowId', passport.authenticate('jwt', {session: false}), authValidationHandler(), async (req, res, next) => {
    const { cowId } = req.params;

    try {
      const deletedCowId = await coworkingService.deleteCow({ cowId });
      res.status(200).json({
        data: deletedCowId,
        message: 'Cow deleted'
      });
    } catch (error) {
      next(error);
    }
  });

};

module.exports = coworkingApi;
