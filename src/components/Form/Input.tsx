import { useState, useEffect } from 'react';
import { Post } from '../Post';

type Input = {
  onBlur: React.FormEvent<HTMLInputElement>;
  value: Post;
};

const Input = ({ onBlur, value }: Input) => {
  const [inputValue, setInputValue] = useState(value);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => setInputValue(event.target.value);

  useEffect(() => {
    // console.log('useEffect');
    setInputValue(value);
  }, [value]);

  // Using onBlur to improve performance.
  return <input onBlur={onBlur} onChange={onInputChange} placeholder={inputValue} value={inputValue} className="text-xl text-slate-900 bg-slate-300  focus:bg-slate-400 placeholder-slate-200 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Input;
