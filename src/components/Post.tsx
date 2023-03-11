import { VscPreview, VscEdit } from 'react-icons/vsc';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import deletePost from '../helper/deletePost';
import DeletePostButton from './DeletePostButton';

interface Post {
  pop(): unknown;
  id: number;
  title: String;
  body: String;
  userId: number;
  reFetchLocal: Function;
}

const Post = ({ post, settings, isDarkStripe, selectPost, reFetchLocal }: PostComponent) => {
  const { id, title, body, userId } = post;

  const { postSettings, triggerPostModal, isEditablePost } = settings;

  return (
    <tr className={` ${isDarkStripe ? 'bg-primary-transparent text-primary-900 dark:text-white' : 'bg-primary-600 text-white'}  `}>
      <td className="p-2 pl-4">{id}</td>
      <td className="p-2">{title}</td>
      <td className="p-2">
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
  );
};

export default Post;
