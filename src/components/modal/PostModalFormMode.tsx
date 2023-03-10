import Form from '../Form/Form';

type PostModalFormMode = {
  settings: {
    triggerPostModal: Function;
    modalVisible: boolean;
    isEditablePost: Function;
    editablePost: boolean;
    selectPost: Function;
    setModalVisible: Function;
    reFetchPosts: Function;
  };
  post: Post;
};

const PostModalFormMode: React.FC<PostModalFormMode> = ({ settings, post }) => {
  const { triggerPostModal, setModalVisible, modalVisible, isEditablePost, editablePost, reFetchPosts } = settings;

  if (post && post.length == 1) {
    const selectedPost: Post | unknown = post.pop();

    return (
      <div id={`post-${selectedPost.id}`} className={`h-4/6 w-5/6  bg-secondary-100 dark:bg-primary-700 text-white shadow-lg rounded-sm max-w-screen-sm  px-4 py-4 mx-auto ${modalVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} z-20`}>
        <Form post={selectedPost} isEditablePost={isEditablePost} setModalVisible={setModalVisible} reFetchPosts={reFetchPosts} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PostModalFormMode;
