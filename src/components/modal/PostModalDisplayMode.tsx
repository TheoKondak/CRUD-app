import { VscCloseAll, VscEdit, VscError } from 'react-icons/vsc';

type PostModalDisplayMode = {
  settings: {
    triggerPostModal: Function;
    modalVisible: boolean;
    isEditablePost: Function;
    editablePost: boolean;
    selectPost: Function;
  };
  post: Post;
};

const PostModalDisplayMode: React.FC<PostModalDisplayMode> = ({ settings, post }) => {
  const { triggerPostModal, modalVisible, isEditablePost, editablePost, selectPost } = settings;

  if (post && post.length == 1) {
    const selectedPost: Post | unknown = post.pop();

    return (
      <div id={`post-${selectedPost.id}`} className={`relative h-4/6  bg-secondary-600 dark:bg-primary-700 text-white shadow-lg rounded-sm max-w-screen-sm  px-4 py-4 mx-auto ${modalVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} z-20`}>
        <div id={`post-${selectedPost.id}-header`} className=" flex items-center justify-between">
          <h2 className="text-xl pb-2 w-4/6 overflow-hidden">{selectedPost.title}</h2>
          <div className=" w-2/6 flex items-center justify-end">
            <button
              title="Edit Post"
              className=" px-2 hover:cursor-pointer  flex items-center justify-center"
              onClick={() => {
                selectPost(selectedPost.id);
                isEditablePost(true);
              }}>
              <VscEdit className="inline-block w-4 h-4" />
            </button>
            <button
              title="Delete Post"
              className="px-2  hover:cursor-pointer flex items-center justify-center"
              onClick={() => {
                triggerPostModal();
              }}>
              <VscError className="inline-block" />
            </button>
          </div>
        </div>
        <button
          className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center hover:cursor-pointer bg-secondary-600 dark:bg-primary-700 text-white shadow-lg rounded-full"
          onClick={() => {
            triggerPostModal();
          }}>
          <VscCloseAll />
        </button>
        <hr />
        <div id={`post-${selectedPost.id}-body`} className="text-md pt-2">
          {selectedPost.body}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PostModalDisplayMode;
