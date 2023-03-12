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
  setPosts: Function;
  posts: Post[];
  post: Post;
};

const PostModalFormMode: React.FC<PostModalFormMode> = ({ settings, post, posts, setPosts }) => {
  const { triggerPostModal, setModalVisible, modalVisible, isEditablePost, editablePost, reFetchLocal } = settings;

  if (post && post.length == 1) {
    const selectedPost: Post | unknown = post.pop();

    return (
      <div id={`post-${selectedPost.id}`} className={`h-4/6 w-4/6  bg-slate-100 dark:bg-primary-700 text-white shadow-lg rounded-sm  px-4 py-4 mx-auto ${modalVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} z-20`}>
        <Form post={selectedPost} isEditablePost={isEditablePost} setModalVisible={setModalVisible} reFetchLocal={reFetchLocal} posts={posts} setPosts={setPosts} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PostModalFormMode;
