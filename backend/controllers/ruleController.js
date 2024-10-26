// src/controllers/ruleController.js
const pool = require('../db/config');
const RuleEvaluator = require('../utils/ruleEvaluator'); // Importing the existing RuleEvaluator class

class RuleController {
    static async createRule(req, res) {
        const { rule_string, description } = req.body;

        if (!rule_string) {
            return res.status(400).json({
                error: 'Rule string is required'
            });
        }

        try {
            // Validate rule by trying to create AST
            const ast = RuleEvaluator.createAST(rule_string); // Using the existing createAST method

            // Store rule in database
            const query = `
                INSERT INTO rules (rule_string, description, ast)
                VALUES ($1, $2, $3)
                RETURNING id, rule_string, description, created_at
            `;
            
            const result = await pool.query(query, [
                rule_string,
                description || '',
                JSON.stringify(ast)
            ]);

            res.status(201).json({
                success: true,
                rule: result.rows[0]
            });
        } catch (error) {
            console.error('Error creating rule:', error);
            res.status(500).json({
                error: 'Failed to create rule',
                details: error.message
            });
        }
    }

    static async evaluateRule(req, res) {
        const { rule_id, data } = req.body;

        if (!rule_id || !data) {
            return res.status(400).json({
                error: 'Both rule_id and data are required'
            });
        }

        try {
            // Fetch rule from database
            const query = 'SELECT rule_string, ast FROM rules WHERE id = $1';
            const result = await pool.query(query, [rule_id]);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    error: 'Rule not found'
                });
            }

            const { ast } = result.rows[0];
            const evaluationResult = RuleEvaluator.evaluate(ast, data); // Using the existing evaluate method

            res.json({
                success: true,
                rule_id,
                eligible: evaluationResult,
                data
            });
        } catch (error) {
            console.error('Error evaluating rule:', error);
            res.status(500).json({
                error: 'Failed to evaluate rule',
                details: error.message
            });
        }
    }

    static async getRules(req, res) {
        try {
            const result = await pool.query(
                'SELECT id, rule_string, description, created_at FROM rules'
            );
            res.json({
                success: true,
                rules: result.rows
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch rules',
                details: error.message
            });
        }
    }
}

module.exports = RuleController; // Export the RuleController class
