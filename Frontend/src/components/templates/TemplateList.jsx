import React, { useState, useEffect } from 'react';
import { HiTemplate } from 'react-icons/hi';

const TemplateList = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Bussiness Logic to fetch templates
  
//   useEffect(() => {
//     fetchTemplates();
//   }, []);
// // 
//   const fetchTemplates = async () => {
    
//   };

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template._id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectTemplate(template)}
        >
          <div className="flex items-center space-x-2 mb-2">
            <HiTemplate className="text-2xl text-primary" />
            <h3 className="text-lg font-semibold">{template.name}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">{template.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Category: {template.category}</span>
            <span>Used: {template.usageCount} times</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateList; 