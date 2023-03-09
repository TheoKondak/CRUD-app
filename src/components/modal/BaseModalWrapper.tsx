import PostModalDisplayMode from './PostModalDisplayMode';
import PostModalFormMode from './PostModalFormMode';

interface BaseModalWrapper {
  post: Post;
  settings: {
    triggerPostModal: React.MouseEventHandler<HTMLDivElement>;
    modalVisible: boolean;
    triggerIsEditablePost: React.MouseEventHandler<HTMLDivElement>;
    editablePost: boolean;
    reFetchPosts: Function;
  };
}

const BaseModalWrapper: React.FC<BaseModalWrapper> = ({ settings, post }) => {
  const { triggerPostModal, modalVisible, triggerIsEditablePost, editablePost, reFetchPosts } = settings;

  return (
    <div className={`modal-wrapper fixed inset-0 flex flex-column items-center justify-center bg-primary-900/50 dark:bg-primary-900/70 z-10  ${modalVisible ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`} onClick={triggerPostModal}>
      {editablePost ? <PostModalFormMode /> : <PostModalDisplayMode />}
    </div>
  );
};

export default BaseModalWrapper;
