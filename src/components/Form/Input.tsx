import { useState } from 'react';

type Input = {};

const Input = ({ onBlur, placeholder, value }: Input) => {
  const [postTitle, setPostTitle] = useState(placeholder);
  const handleInputTitleUpdate = (event) => setPostTitle(event.target.value);

  return <input onChange={handleInputTitleUpdate} onBlur={onBlur} placeholder={placeholder} value={postTitle} className="w-2/6 text-xl text-slate-900 bg-slate-300  focus:bg-slate-400 placeholder-slate-200 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Input;
