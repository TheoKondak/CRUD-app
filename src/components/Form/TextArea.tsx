import { useState } from 'react';

type Textarea = {};

function TextArea({ onChange, value }: Textarea) {
  return (
    <div id="edit-post" className="relative h-full">
      <textarea onChange={onChange} placeholder={value} value={value} className="text-sm text-slate-900 bg-slate-300 focus:bg-slate-400  placeholder-white p-1 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 focus:shadow-2xl h-full shadow-lg rounded-sm resize-none overflow-y-auto" />
      <span className="text-xs text-slate-800 absolute left-1 bottom-1">
        {value.length > 0 && `${value.split(' ').length} words | ${value.length} characters`}{' '}
        <span className="inline-block">
          <img src="./Markdown-mark.svg" height="10" width="20" className="inline-block" />
          arkdown
        </span>
      </span>
    </div>
  );
}

export default TextArea;
