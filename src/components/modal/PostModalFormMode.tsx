import Form from '../Form/Form';

type PostModalFormMode = {
  settings: {
    triggerPostModal: Function;
    modalVisible: boolean;
    isEditablePost: Function;
    editablePost: boolean;
    selectPost: Function;
    setModalVisible: Function;
    reFetchLocal: Function;
  };
  post: Post;
};

const PostModalFormMode: React.FC<PostModalFormMode> = ({ settings, post }) => {
  const { triggerPostModal, setModalVisible, modalVisible, isEditablePost, editablePost, reFetchLocal } = settings;

  if (post && post.length == 1) {
    const selectedPost: Post | unknown = post.pop();

    return (
      <div id={`post-${selectedPost.id}`} className={`h-5/6 md:h-4/6 w-5/6 md:w-4/6  bg-slate-100 dark:bg-slate-700 text-white shadow-lg rounded-sm  px-4 py-4 mx-auto ${modalVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} z-20`}>
        <Form post={selectedPost} isEditablePost={isEditablePost} setModalVisible={setModalVisible} reFetchLocal={reFetchLocal} />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-100 p-10 z-20 rounded-md">
          <h2>
            Oups, this is embarrassing, <br /> Failed to load Modal.
          </h2>
          <div>
            <h3>Expected Post but received:</h3>
            <p>{post ? post.toString() : 'No available post'}</p>
            <span>Typeof Post: {typeof post}</span>
          </div>
        </div>
      </div>
    );
  }
};

export default PostModalFormMode;
