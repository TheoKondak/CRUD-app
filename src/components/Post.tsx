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
      <div className={` bg-primary-100 dark:bg-slate-800 text-primary-900 dark:text-white shadow-2xl rounded-xl flex flex-wrap justify-around md:grid grid-cols-table lg:grid-cols-table-lg my-2 mx-3 p-2 md:mx-0 first:mt-0 last:mb-0`}>
        <div className="p-2 pl-4 hidden md:flex items-center justify-center">
          <span>{id}</span>
        </div>

        <div id={`post-${id}`} className="p-2 flex flex-col items-start justify-center order-1 w-100 md:order-none">
          <div id={`post-${id}-title`}>
            <h3 className="text-md text-left pb-1 mb-1">{title}</h3>
            <hr className="my-2 border-1 border-primary-800 dark:border-primary-200 shadow-lg" />
          </div>

          <div className="max-h-[100px] overflow-y-auto flex items-center justify-center">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body.length > Number(postSettings.postPreviewLength) ? `${body.substring(0, Number(postSettings.postPreviewLength))}...` : body}</ReactMarkdown>
          </div>
        </div>
        <div className="p-2 pl-4 flex md:hidden min-w-max items-center justify-center w-min-max order-4">
          <div className="flex justify-center items-center">
            <strong>Post Id: {id}</strong>
          </div>
        </div>
        <div className="p-2 pl-4  flex items-center justify-center w-min-max order-5">
          <div className="flex justify-center items-center">
            <strong className="inline-block md:hidden">User Id: {userId}</strong>
          </div>
        </div>
        <div id="view-post" className="p-0 relative flex items-center justify-center w-10 md:w-auto w-min-max order-6 ">
          <button
            title="View Post"
            className={`flex justify-center items-center w-full h-full absolute inset-0 hover:shadow-2xl`}
            onClick={() => {
              selectPost(id);
              triggerPostModal();
            }}>
            <VscPreview className="w-5 h-5 hover:cursor-pointer" />
          </button>
        </div>
        <div id="edit-post" className="p-0 relative flex items-center justify-center  w-10 md:w-auto  w-min-max order-7">
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
        <div className="p-0 relative flex items-center justify-center w-10 md:w-auto w-min-max order-8">
          <DeletePostButton id={id} selectPost={selectPost} reFetchLocal={reFetchLocal} className="block" />
        </div>
      </div>
    ),
    [post, settings, selectPost, reFetchLocal]
  );
};

export default Post;
