import React, { useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="text-xl text-green-500" />;
      case 'error':
        return <HiXCircle className="text-xl text-red-500" />;
      case 'info':
        return <HiInformationCircle className="text-xl text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg border ${getBgColor()} flex items-center space-x-3 animate-slide-up`}
    >
      {getIcon()}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Toast; 