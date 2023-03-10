import React from 'react';

type Textarea = {};

function TextArea({ onChange, placeholder, value }: Textarea) {
  return <textarea onChange={onChange} placeholder={placeholder} value={value} className="bg-secondary-700 focus:bg-secondary-800 text-white placeholder-white p-1 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 focus:shadow-2xl h-full shadow-lg rounded-sm" />;
}

export default TextArea;
