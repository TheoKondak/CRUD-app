import { VscPreview, VscEdit, VscError } from 'react-icons/vsc';

const Post = ({ post, settings, isDarkStripe, selectPost }: PostComponent) => {
  const { id, title, body, userId } = post;

  const { postSettings, triggerPostModal, isEditablePost } = settings;

  return (
    <tr className={` ${isDarkStripe ? 'bg-primary-transparent text-primary-900 dark:text-white' : 'bg-primary-600 text-white'}  `}>
      <td className="p-2 pl-4">{id}</td>
      <td className="p-2">{title}</td>
      <td className="p-2">{body.length > postSettings.postPreviewLength ? `${body.substring(0, postSettings.postPreviewLength)}...` : body}</td>
      <td className="p-2 pl-4">
        <div className="flex justify-center items-center">{userId}</div>
      </td>
      <td className="p-1">
        <button
          title="View Post"
          className="flex justify-center items-center"
          onClick={() => {
            selectPost(id);
            triggerPostModal();
          }}>
          <VscPreview className="w-5 h-5 hover:cursor-pointer" />
        </button>
      </td>
      <td className="p-1">
        <button
          title="Edit Post"
          className="flex justify-center items-center"
          onClick={() => {
            selectPost(id);
            triggerPostModal();
            isEditablePost(true);
          }}>
          <VscEdit className="w-5 h-5 hover:cursor-pointer" />
        </button>
      </td>
      <td className="p-1">
        <button
          title="Delete Post"
          className="flex justify-center items-center"
          onClick={() => {
            selectPost(id);
          }}>
          <VscError className="w-5 h-5 hover:cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default Post;
