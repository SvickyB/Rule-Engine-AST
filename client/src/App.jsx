// frontend/src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RuleList from './components/RuleList';
import CreateRule from './components/CreateRule';
import UpdateRule from './components/UpdateRule';  
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRules';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<RuleList />} />
          <Route path="/create" element={<CreateRule />} />
          <Route path="/edit/:id" element={<UpdateRule />} /> 
          <Route path="/evaluate" element={<EvaluateRule />} />
          <Route path="/combine" element={<CombineRules />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
