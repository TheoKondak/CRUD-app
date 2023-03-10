import React from 'react';

type Search = {
  placeholder: string;
  onChange: Function;
};

const Search = ({ placeholder, onChange }: Search) => {
  return <input placeholder={placeholder} onChange={onChange} />;
};

export default Search;
