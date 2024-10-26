// frontend/src/components/EvaluateRule.jsx
import { useState } from 'react';
import { evaluateRule } from '../api/rules';

const EvaluateRule = () => {
  const [formData, setFormData] = useState({
    rule_id: '',
    data: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(formData.data);
      const response = await evaluateRule(formData.rule_id, jsonData);
      setResult(response);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Evaluate Rule</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rule ID</label>
          <input
            type="number"
            value={formData.rule_id}
            onChange={(e) => setFormData({ ...formData, rule_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data (JSON)</label>
          <textarea
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="4"
            placeholder='{"age": 25, "income": 50000}'
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500
          text-white rounded-md hover:bg-blue-600"
        >
          Evaluate
        </button>
      </form>
      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <div className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Eligible:</span>
              <span className={result.eligible ? 'text-green-600' : 'text-red-600'}>
                {result.eligible ? 'True' : 'False'}
              </span>
            </div>
            <pre className="mt-2 bg-gray-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluateRule;