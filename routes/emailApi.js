const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const EmailService = require('../services/emails');
const { config } = require('../config');
require('../utils/auth/strategies/jwt');

const emailApi = (app) => {
  const router = express.Router();
  app.use('/api/email', router);

  const emailService = new EmailService();

  router.post('/send', async (req, res, next) => {
    const { body: emailInfo } = req;

    const userMessage = {
      to: emailInfo.emailUser,
      from: config.emailBescow,
      subject: `Reserva en ${emailInfo.place}`,
      html: `<h3>Hola ${emailInfo.nameUser}!</h3>
             <p>Confirmación de la reserva en ${emailInfo.place} para ${emailInfo.quantityUser} ${emailInfo.quantityUser > 1 ? 'personas' : 'persona'} del ${emailInfo.checkin} al ${emailInfo.checkout}</p>`
    };

    const cowMessage = {
      to: emailInfo.emailCow,
      from: config.emailBescow,
      cc: 'afvalenciab@gmail.com',
      subject: `Reserva en ${emailInfo.place}`,
      html: `<h3>Nueva reserva en ${emailInfo.place}!</h3>
             <p>El usuario ${emailInfo.emailUser} realizo una resernva en ${emailInfo.place} para ${emailInfo.quantityUser} ${emailInfo.quantityUser > 1 ? 'personas' : 'persona'} del ${emailInfo.checkin} al ${emailInfo.checkout}</p>`
    };

    try {
      const emailSentUser = await emailService.sendEmail(userMessage);
      const emailSentCow = await emailService.sendEmail(cowMessage);

      res.status(200).json({
        data: `${emailSentUser[0].statusMessage} ${emailSentCow[0].statusMessage}`,
        message: `Email Sent to ${userMessage.to} and ${cowMessage.to}`
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
};
module.exports = emailApi;
