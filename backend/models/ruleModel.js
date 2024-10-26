const pool = require('../db/config');
const RuleEvaluator = require('../utils/ruleEvaluator');

const RuleModel = {
    createRule: async (ruleString, description) => {
        const query = `
            INSERT INTO rules (rule_string, description)
            VALUES ($1, $2)
            RETURNING id, rule_string, description, created_at, updated_at
        `;
        const res = await pool.query(query, [ruleString, description]);
        return res.rows[0];
    },

    getRules: async () => {
        const query = `
            SELECT id, rule_string, description, created_at, updated_at
            FROM rules
            ORDER BY created_at DESC
        `;
        const res = await pool.query(query);
        return res.rows;
    },

    getRule: async (id) => {
        const query = `
            SELECT id, rule_string, description, created_at, updated_at
            FROM rules
            WHERE id = $1
        `;
        const res = await pool.query(query, [id]);
        return res.rows[0];
    },

    updateRule: async (id, ruleString, description) => {
        const query = `
            UPDATE rules 
            SET rule_string = $1, description = $2
            WHERE id = $3
            RETURNING id, rule_string, description, created_at, updated_at
        `;
        const res = await pool.query(query, [ruleString, description, id]);
        return res.rows[0];
    },

    deleteRule: async (id) => {
        const query = `
            DELETE FROM rules 
            WHERE id = $1
            RETURNING id, rule_string, description, created_at, updated_at
        `;
        const res = await pool.query(query, [id]);
        return res.rows[0];
    },

    evaluateRule: async (id, data) => {
        const query = 'SELECT rule_string FROM rules WHERE id = $1';
        const res = await pool.query(query, [id]);
        
        if (res.rows.length === 0) {
            throw new Error('Rule not found');
        }

        const ast = RuleEvaluator.createAST(res.rows[0].rule_string);
        return RuleEvaluator.evaluate(ast, data);
    },

    combineRules: async (rules) => {
        const ruleStrings = [];
        let combinedRule = '';

        for (let i = 0; i < rules.length; i++) {
            const { rule_id, operator } = rules[i];
            const query = 'SELECT rule_string FROM rules WHERE id = $1';
            const res = await pool.query(query, [rule_id]);

            if (res.rows.length === 0) {
                throw new Error(`Rule with id ${rule_id} not found`);
            }

            const ruleString = res.rows[0].rule_string;
            ruleStrings.push(ruleString);

            if (i < rules.length - 1 && operator) {
                combinedRule += `${ruleString} ${operator} `;
            } else {
                combinedRule += ruleString; // No operator for the last rule
            }
        }

        // Create a new rule with the combined rule string
        const newRule = await pool.query(`
            INSERT INTO rules (rule_string, description)
            VALUES ($1, $2)
            RETURNING id, rule_string, description, created_at, updated_at
        `, [combinedRule, 'Combined rule from multiple rules']);

        return {
            combinedRule: newRule.rows[0],
            combinedRuleString: combinedRule
        };
    }
};

module.exports = RuleModel;
