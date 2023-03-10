import PostModalDisplayMode from './PostModalDisplayMode';
import PostModalFormMode from './PostModalFormMode';

interface BaseModalWrapper {
  post: Post;
  settings: {
    triggerPostModal: React.MouseEventHandler<HTMLDivElement>;
    modalVisible: boolean;
    isEditablePost: React.MouseEventHandler<HTMLDivElement>;
    editablePost: boolean;
    reFetchPosts: Function;
    selectPost: Function;
    setModalVisible: boolean;
    formInUpdateMode: boolean;
    // : Function;
  };
}

const BaseModalWrapper: React.FC<BaseModalWrapper> = ({ settings, post }) => {
  const { triggerPostModal, modalVisible, isEditablePost, editablePost, reFetchPosts, selectPost, setModalVisible } = settings;
  // console.log(post);
  return (
    <div className={`fixed inset-0 modal-wrapper  flex flex-column items-center justify-center ${modalVisible ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'}`}>
      <div
        className={`fixed inset-0 bg-primary-900/50 dark:bg-primary-900/70 z-10  `}
        onClick={() => {
          triggerPostModal();
          isEditablePost(false);
        }}></div>

      {editablePost ? <PostModalFormMode settings={{ triggerPostModal, modalVisible, isEditablePost, editablePost, selectPost, setModalVisible, reFetchPosts }} post={post} /> : <PostModalDisplayMode settings={{ triggerPostModal, modalVisible, isEditablePost, editablePost, selectPost }} post={post} />}
    </div>
  );
};

export default BaseModalWrapper;
