import { useState } from 'react';

type Textarea = {};

function TextArea({ onBlur, placeholder, value }: Textarea) {
  const [postBody, setPostBody] = useState(placeholder);
  const handleTextareaBodyUpdate = (event) => setPostBody(event.target.value);
  return <textarea onChange={handleTextareaBodyUpdate} onBlur={onBlur} placeholder={placeholder} value={postBody} className="text-sm text-slate-900 bg-slate-300 focus:bg-slate-400  placeholder-white p-1 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 focus:shadow-2xl h-full shadow-lg rounded-sm resize-none overflow-y-auto" />;
}

export default TextArea;
