import React, { useState, useRef } from 'react';
import { HiUpload, HiX } from 'react-icons/hi';

const FileUpload = ({ onFileSelect, accept = '*', maxSize = 5 }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Check file size (in MB)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size should be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    setError(null);
    onFileSelect(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HiUpload className="text-xl text-primary" />
              <span className="text-sm">{file.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <HiX className="text-xl" />
            </button>
          </div>
        ) : (
          <div>
            <HiUpload className="text-3xl text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max file size: {maxSize}MB
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileUpload; 