import { useMemo } from 'react';

import { VscPreview, VscEdit } from 'react-icons/vsc';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DeletePostButton from './DeletePostButton';

const Post = ({ post, settings, selectPost, reFetchLocal }: PostComponent) => {
  const { id, title, body, userId } = post;

  const { postSettings, triggerPostModal, isEditablePost } = settings;
  return useMemo(
    () => (
      <div className={` bg-primary-100 dark:bg-slate-800 text-primary-900 dark:text-white shadow-2xl rounded-xl grid grid-cols-table lg:grid-cols-table-lg my-2 first:mt-0 last:mb-0`}>
        <div className="p-2 pl-4 flex items-center justify-center">
          <span>{id}</span>
        </div>

        <div className="p-2 flex flex-col items-start justify-center">
          <div>
            <h3 className="text-md text-left pb-1 mb-1">{title}</h3>
            <hr className="my-2 border-1 border-primary-800 dark:border-primary-200 shadow-lg" />
          </div>

          <div className="max-h-[100px] overflow-y-auto flex items-center justify-center">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body.length > Number(postSettings.postPreviewLength) ? `${body.substring(0, Number(postSettings.postPreviewLength))}...` : body}</ReactMarkdown>
          </div>
        </div>
        <div className="p-2 pl-4  flex items-center justify-center">
          <div className="flex justify-center items-center">{userId}</div>
        </div>
        <div className="p-0 relative flex items-center justify-center ">
          <button
            title="View Post"
            className={`flex justify-center items-center w-full h-full  absolute inset-0 hover:shadow-2xl`}
            onClick={() => {
              selectPost(id);
              triggerPostModal();
            }}>
            <VscPreview className="w-5 h-5 hover:cursor-pointer" />
          </button>
        </div>
        <div className="p-0 relative flex items-center justify-center">
          <button
            title="Edit Post"
            className={`flex justify-center items-center w-full h-full  absolute inset-0 hover:shadow-2xl`}
            onClick={() => {
              selectPost(id);
              triggerPostModal();
              isEditablePost(true);
            }}>
            <VscEdit className="w-5 h-5 hover:cursor-pointer" />
          </button>
        </div>
        <div className="p-0 relative flex items-center justify-center">
          <DeletePostButton id={id} selectPost={selectPost} reFetchLocal={reFetchLocal} />
        </div>
      </div>
    ),
    [post, settings, selectPost, reFetchLocal]
  );
};

export default Post;
