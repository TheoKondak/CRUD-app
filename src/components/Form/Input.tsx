import React from 'react';

type Input = {};

const Input = ({ onChange, placeholder, value }: Input) => {
  return <input onChange={onChange} placeholder={placeholder} value={value} className="w-2/6 text-xl text-slate-900 bg-slate-300  focus:bg-slate-400 placeholder-slate-200 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Input;
