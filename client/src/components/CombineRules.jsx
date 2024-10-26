// frontend/src/components/CombineRules.jsx
import { useState, useEffect } from 'react';
import { fetchRules, combineRules } from '../api/rules';

const CombineRules = () => {
  const [availableRules, setAvailableRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([{ rule_id: '', operator: 'AND' }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await fetchRules();
      setAvailableRules(response.rules);
      setLoading(false);
    } catch (err) {
      setError('Failed to load rules');
      setLoading(false);
    }
  };

  const handleAddRule = () => {
    setSelectedRules([...selectedRules, { rule_id: '', operator: 'AND' }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = selectedRules.filter((_, i) => i !== index);
    setSelectedRules(newRules);
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...selectedRules];
    newRules[index] = { ...newRules[index], [field]: value };
    setSelectedRules(newRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await combineRules({ rules: selectedRules });
      setResult(response);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Combine Rules</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedRules.map((rule, index) => (
          <div key={index} className="flex items-center space-x-2">
            <select
              value={rule.rule_id}
              onChange={(e) => handleRuleChange(index, 'rule_id', e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a rule</option>
              {availableRules.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.description || r.rule_string}
                </option>
              ))}
            </select>
            {index < selectedRules.length - 1 && (
              <select
                value={rule.operator}
                onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            )}
            {selectedRules.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveRule(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddRule}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            + Add Rule
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Combine Rules
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Combined Rule:</h2>
          <div className="bg-white p-4 rounded-md shadow">
            <pre className="whitespace-pre-wrap">{result.combined_rule.rule_string}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombineRules;