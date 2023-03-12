import { useMemo } from 'react';

import { VscPreview, VscEdit } from 'react-icons/vsc';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DeletePostButton from './DeletePostButton';

export interface Post {
  pop(): unknown;
  id: number;
  title: String;
  body: String;
  userId: number;
  reFetchLocal: Function;
}

const Post = ({ post, settings, selectPost, reFetchLocal }: PostComponent) => {
  const { id, title, body, userId } = post;

  const { postSettings, triggerPostModal, isEditablePost } = settings;
  console.log(userId);
  return useMemo(
    () => (
      <tr className={` bg-primary-100 dark:bg-primary-800 text-primary-900 dark:text-white border-b-[1px] last:border-b-0 border-slate-300 shadow-2xl`}>
        <td className="p-2 pl-4 ">{id}</td>
        <td className="p-2">{title}</td>
        <td className="p-2 max-h-[100px] overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body.length > Number(postSettings.postPreviewLength) ? `${body.substring(0, Number(postSettings.postPreviewLength))}...` : body}</ReactMarkdown>
        </td>
        <td className="p-2 pl-4">
          <div className="flex justify-center items-center">{userId}</div>
        </td>
        <td className="p-0 relative">
          <button
            title="View Post"
            className={`flex justify-center items-center w-full h-full  absolute inset-0 hover:shadow-2xl`}
            onClick={() => {
              selectPost(id);
              triggerPostModal();
            }}>
            <VscPreview className="w-5 h-5 hover:cursor-pointer" />
          </button>
        </td>
        <td className="p-0 relative">
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
        </td>
        <td className="p-0 relative">
          <DeletePostButton id={id} selectPost={selectPost} reFetchLocal={reFetchLocal} />
        </td>
      </tr>
    ),
    [post, settings, selectPost, reFetchLocal]
  );
};

export default Post;
