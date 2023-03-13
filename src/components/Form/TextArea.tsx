import { useState, useEffect } from 'react';

type Textarea = {};

function TextArea({ onBlur, value }: Textarea) {
  const [textAreaValue, setTextAreaValue] = useState(value);

  const onInputChange = (event) => setTextAreaValue(event.target.value);

  useEffect(() => {
    // console.log('useEffect');
    setTextAreaValue(value);
  }, [value]);

  // const onBlur
  // console.log('textarea');

  return (
    <div id="edit-post" className="relative h-full">
      <textarea onChange={onInputChange} onBlur={onBlur} placeholder={textAreaValue} value={textAreaValue} className="text-sm text-slate-900 bg-slate-300 focus:bg-slate-400  placeholder-white p-1 py-2 pl-2 w-full outline-0 hover:outline-0 active:outline-0 focus:outline-0 focus:shadow-2xl h-full shadow-lg rounded-sm resize-none overflow-y-auto" />
      <span className="text-xs text-slate-800 bg-slate-200 rounded-tr-md absolute left-0 bottom-0 pl-3 px-4 ">
        {textAreaValue.length > 0 && `${textAreaValue.split(' ').length} words | ${textAreaValue.length} characters`}
        <span className="inline-block">
          <img src="./Markdown-mark.svg" height="10" width="20" className="inline-block ml-3" />
        </span>
      </span>
    </div>
  );
}

export default TextArea;
