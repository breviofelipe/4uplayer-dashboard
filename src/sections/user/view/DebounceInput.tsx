import React, { useState, useEffect, useCallback } from 'react';

import { OutlinedInput, InputAdornment } from '@mui/material';

import { Iconify } from 'src/components/iconify';

interface DebounceInputProps {
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  onDebouncedChange,
  placeholder = 'Search user...',
  debounceTime = 1369
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  const debounce = useCallback((func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []); // Este useCallback não tem dependências

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const debouncedHandleChange = useCallback((value: string) => {
    const debouncedFunc = debounce((val: string) => {
      setDebouncedValue(val);
    }, debounceTime);
    debouncedFunc(value);
  }, [debounce, debounceTime]);

  useEffect(() => {
    debouncedHandleChange(inputValue);
  }, [inputValue, debouncedHandleChange]);

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

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
      {inputValue !== debouncedValue && (
        <p style={{ color: '#888', fontSize: '14px' }}>Waiting for you to stop typing...</p>
      )}
    </div>
  );
};

export default DebounceInput;