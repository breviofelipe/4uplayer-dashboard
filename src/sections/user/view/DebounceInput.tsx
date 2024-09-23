import React, { useRef, useState, useEffect } from 'react';

import { OutlinedInput, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface DebounceInputProps {
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  onDebouncedChange,
  placeholder = 'Type here...',
  debounceTime = 3000
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setIsDebouncing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onDebouncedChange(newValue);
      setIsDebouncing(false);
    }, debounceTime);
  };

  useEffect(() => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }, []);

  return (
    <div>
      <OutlinedInput
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      {isDebouncing && (
        <p style={{ color: '#888', fontSize: '14px' }}>Waiting for you to stop typing...</p>
      )}
    </div>
  );
};

export default DebounceInput;