import React from 'react';

type Search = {
  placeholder: string;
  onChange: Function;
};

const Search = ({ placeholder, onChange }: Search) => {
  return <input placeholder={placeholder} onChange={onChange} className="w-full 2xl:w-1/2 text-xl placeholder-slate-400 bg-primary-100     py-2 pl-2 outline-0 hover:outline-0 active:outline-0 border-3 border-transparent focus:border-tertiary-500 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Search;
