import React from 'react';

type Search = {
  placeholder: string;
  onChange: Function;
};

const Search = ({ placeholder, onChange }: Search) => {
  return <input placeholder={placeholder} onChange={onChange} className="w-1/2 text-xl focus:placeholder-slate-700 placeholder-slate-200 bg-primary-600  focus:bg-primary-400 focus:outline-2 outline-secondary-600  py-2 pl-2 outline-0 hover:outline-0 active:outline-0 shadow-lg focus:shadow-2xl rounded-sm" />;
};

export default Search;
