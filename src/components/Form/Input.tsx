import React from 'react';

type Input = {};

const Input = ({ onChange, placeholder, value }: Input) => {
  return <input onChange={onChange} placeholder={placeholder} value={value} className="text-xl bg-secondary-700 focus:bg-secondary-800 text-white placeholder-white py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Input;
