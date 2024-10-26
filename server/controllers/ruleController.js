const RuleModel = require('../models/ruleModel');
const RuleEvaluator = require('../utils/ruleEvaluator');
const VALID_OPERATORS = ['AND', 'OR', 'NOT'];

const RuleController = {
    createRule: async (req, res) => {
        try {
            const { rule_string, description } = req.body;
            
            if (!rule_string) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Rule string is required' 
                });
            }

            // Validate rule syntax by attempting to create AST
            try {
                RuleEvaluator.createAST(rule_string);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid rule syntax',
                    details: error.message
                });
            }

            const rule = await RuleModel.createRule(rule_string, description);
            res.status(201).json({ 
                success: true, 
                rule 
            });
        } catch (error) {
            console.error('Error creating rule:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create rule',
                details: error.message
            });
        }
    },

    getRules: async (req, res) => {
        try {
            const rules = await RuleModel.getRules();
            res.json({ 
                success: true, 
                rules 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch rules',
                details: error.message
            });
        }
    },

    getRule: async (req, res) => {
        try {
            const { id } = req.params;
            const rule = await RuleModel.getRule(id);
            
            if (!rule) {
                return res.status(404).json({
                    success: false,
                    error: 'Rule not found'
                });
            }

            res.json({ 
                success: true, 
                rule 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to fetch rule',
                details: error.message
            });
        }
    },

    updateRule: async (req, res) => {
        try {
            const { id } = req.params;
            const { rule_string, description } = req.body;

            if (!rule_string) {
                return res.status(400).json({
                    success: false,
                    error: 'Rule string is required'
                });
            }

            // Validate rule syntax
            try {
                RuleEvaluator.createAST(rule_string);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid rule syntax',
                    details: error.message
                });
            }

            const rule = await RuleModel.updateRule(id, rule_string, description);
            
            if (!rule) {
                return res.status(404).json({
                    success: false,
                    error: 'Rule not found'
                });
            }

            res.json({ 
                success: true, 
                rule 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to update rule',
                details: error.message
            });
        }
    },

    deleteRule: async (req, res) => {
        try {
            const { id } = req.params;
            const rule = await RuleModel.deleteRule(id);
            
            if (!rule) {
                return res.status(404).json({
                    success: false,
                    error: 'Rule not found'
                });
            }

            res.json({ 
                success: true, 
                rule 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to delete rule',
                details: error.message
            });
        }
    },

    evaluateRule: async (req, res) => {
        try {
            const { rule_id, data } = req.body;

            if (!rule_id || !data) {
                return res.status(400).json({
                    success: false,
                    error: 'Both rule_id and data are required'
                });
            }

            const result = await RuleModel.evaluateRule(rule_id, data);
            res.json({
                success: true,
                rule_id,
                eligible: result,
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to evaluate rule',
                details: error.message
            });
        }
    },

    combineRules: async (req, res) => {
        try {
            const { rules } = req.body;
    
            if (!Array.isArray(rules) || rules.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Array of rules is required'
                });
            }
    
            const { combinedRule, combinedRuleString } = await RuleModel.combineRules(rules);
            
            // Validate combined rule syntax
            try {
                RuleEvaluator.createAST(combinedRuleString);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid combined rule syntax',
                    details: error.message
                });
            }
    
            res.json({ 
                success: true, 
                combined_rule: combinedRule 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Failed to combine rules',
                details: error.message
            });
        }
    }
}
module.exports = RuleController;