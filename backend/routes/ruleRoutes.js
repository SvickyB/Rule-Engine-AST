// src/routes/ruleRoutes.js
const express = require('express');
const RuleController = require('../controllers/ruleController');

const router = express.Router();

router.post('/create_rule', RuleController.createRule);
router.post('/evaluate_rule', RuleController.evaluateRule);
router.get('/rules', RuleController.getRules);

module.exports = router;