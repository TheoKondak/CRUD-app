import { useState, useEffect } from 'react';
import { Post } from '../Post';

type Input = {
  onBlur: React.FormEvent<HTMLInputElement>;
  value: Post;
  postTitleLength: Object;
};

const Input = ({ onBlur, value, postTitleLength }: Input) => {
  const [inputValue, setInputValue] = useState(value);
  const [inputValueLength, setInputValueLength] = useState(value.length);

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.target.value.length < postTitleLength && setInputValue(event.target.value);
    event.target.value.length <= postTitleLength && setInputValueLength(event.target.value.length);
  };

  useEffect(() => {
    // console.log('useEffect');
    setInputValue(value);
  }, [value]);

  // Using onBlur to improve performance.
  return (
    <div className="w-full relative">
      <input onBlur={onBlur} onChange={onInputChange} placeholder={inputValue} value={inputValue} className="text-md md:text-xl text-slate-900 bg-slate-300  focus:bg-slate-400 placeholder-slate-200 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />
      <span className="text-sm absolute right-0 bottom-0 bg-slate-300 text-slate-700 pt-[2px] pl-[4px] pr-[2px] pb-[2px] rounded-sm">{`${postTitleLength - inputValueLength}`}</span>
    </div>
  );
};

export default Input;
