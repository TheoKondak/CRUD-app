import { useState } from 'react';

type Textarea = {};

function TextArea({ onBlur, placeholder, value }: Textarea) {
  const [postBody, setPostBody] = useState(placeholder);
  const handleTextareaBodyUpdate = (event) => setPostBody(event.target.value);
  // console.log('TextArea:');
  // console.log(postBody);
  // console.log('Textarea Value');
  // console.log(value);
  // console.log('Textarea Placehodler');
  // console.log(placeholder);

  console.log('----');
  return (
    <div id="edit-post" className="relative h-full">
      <textarea onChange={handleTextareaBodyUpdate} onBlur={onBlur} placeholder={postBody} value={postBody} className="text-sm text-slate-900 bg-slate-300 focus:bg-slate-400  placeholder-white p-1 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 focus:shadow-2xl h-full shadow-lg rounded-sm resize-none overflow-y-auto" />
      <span className="text-xs text-slate-800 absolute left-1 bottom-1">{postBody.length > 0 && `${postBody.split(' ').length} words | ${postBody.length} characters`}</span>
    </div>
  );
}

export default TextArea;
