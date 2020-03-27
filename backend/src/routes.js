const express = require('express');
const router = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**
 * Tipos de parâmetros:
 * 
 * Query: parâmetros nomeados enviados na rota após o "?". É usado para filtragens, listagens, etc.
 *        Ex: http://localhost:3000/users?name=Vitor&age=18
 *        Acesso: req.query;
 * Route: parâmetros utilizados para identificar recursos.
 *        Ex: http://localhost:3000/users/:id
 *        Acesso: req.params;
 * Request Body: corpo da requisição, utilizado para criar ou alterar recursos.
 *        Acesso: req.body;
 */

router.post('/sessions', SessionController.create);

router.get('/ongs', OngController.index);

router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}),OngController.create);

router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index);

router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentController.index);

router.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),IncidentController.create);

router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete);

module.exports = router;