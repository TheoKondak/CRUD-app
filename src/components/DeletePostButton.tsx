import { VscError } from 'react-icons/vsc';
import { toast } from 'react-toastify';

// Helper
import deletePost from '../helper/deletePost';

interface DeletePostButton {
  title?: string;
  text?: string;
  alertMessage?: string;
  id: number;
  selectPost?: Function;
  reFetchLocal: Function;
  customOnClick?: Function;
  className?: string;
  icon?: boolean;
}

const DeletePostButton = ({ title, text = '', alertMessage = `Are you sure that you want to delete this post? \n Press OK to delete, or cancel to keep the post`, id, selectPost, reFetchLocal, customOnClick = () => {}, className, icon = true }: DeletePostButton) => {
  return (
    <button
      title={title || text || 'Delete Post'}
      className={className ? className : `flex justify-center items-center w-full h-full  absolute inset-0 hover:shadow-2xl`}
      onClick={() => {
        if (window.confirm(alertMessage)) {
          selectPost && selectPost(id);
          deletePost(id);
          reFetchLocal();
          customOnClick();
          toast('Post Deleted');
        }
      }}>
      {icon && <VscError className={`w-5 h-5 hover:cursor-pointer ${text.length > 0 && 'mr-2'}`} />} {text.length > 0 && text}
    </button>
  );
};

export default DeletePostButton;
