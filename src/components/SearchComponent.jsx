import React, { useState } from 'react';

const SearchableSelect = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOption = (option) => {
    setSearchTerm(option.name);
    setShowDropdown(false);
    onSelect(option);
  };

  return (
    <div style={{ position: 'relative', width:"40%" }}>
      <input
        type="text"
        placeholder="Уведіть назву локації..."
        className="form-control bg-light"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          setShowDropdown(value !== '');
        }}
      />
      {showDropdown && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 999,
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '100%',
          }}
          className='m-2 p-1 bg-light'
        >
          {filteredOptions.map((option, index) => (
            <div 
              key={option.id} 
              onClick={() => handleSelectOption(option)}
              className='p-1'
              style={{ 
                cursor: 'pointer',
                borderBottom: index !== filteredOptions.length - 1 ? '1px solid #ddd' : 'none',
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
