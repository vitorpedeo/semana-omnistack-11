const express = require('express');
const router = express.Router();

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
router.post('/ongs', OngController.create);

router.get('/profile', ProfileController.index);

router.get('/incidents', IncidentController.index);
router.post('/incidents', IncidentController.create);
router.delete('/incidents/:id', IncidentController.delete);

module.exports = router;