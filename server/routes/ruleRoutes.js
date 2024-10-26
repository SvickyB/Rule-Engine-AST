// backend/src/routes/ruleRoutes.js
const express = require('express');
const RuleController = require('../controllers/ruleController');

const router = express.Router();

// CRUD operations
router.post('/rules', RuleController.createRule);
router.get('/rules', RuleController.getRules);
router.get('/rules/:id', RuleController.getRule);
router.put('/rules/:id', RuleController.updateRule);
router.delete('/rules/:id', RuleController.deleteRule);

// Special operations
router.post('/rules/evaluate', RuleController.evaluateRule);
router.post('/rules/combine', RuleController.combineRules);

module.exports = router;