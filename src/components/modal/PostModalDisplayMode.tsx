import { VscCloseAll, VscEdit, VscError } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DeletePostButton from '../DeletePostButton';

type PostModalDisplayMode = {
  settings: {
    triggerPostModal: Function;
    modalVisible: boolean;
    isEditablePost: Function;
    editablePost: boolean;
    selectPost: Function;
    reFetchLocal: Function;
  };
  post: Post;
};

const PostModalDisplayMode: React.FC<PostModalDisplayMode> = ({ settings, post }) => {
  const { triggerPostModal, modalVisible, isEditablePost, editablePost, selectPost, reFetchLocal } = settings;

  if (post && post.length == 1) {
    const selectedPost: Post | unknown = post.pop();

    return (
      <div id={`post-${selectedPost.id}`} className={`relative h-4/6 w-4/6  bg-slate-100 dark:bg-slate-700 shadow-lg rounded-sm px-4 py-4 mx-auto ${modalVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} z-20`}>
        <div id={`post-${selectedPost.id}-header`} className=" flex items-center justify-between">
          <h2 className="text-xl text-slate-900 dark:text-primary-100 pb-2 w-4/6 overflow-hidden">{selectedPost.title}</h2>
          <div className=" w-2/6 flex items-center justify-end">
            <button
              title="Edit Post"
              className=" px-2 hover:cursor-pointer  flex items-center justify-center hover:text-secondary-500 transition delay-150 duration-300 ease-in-out dark:text-primary-100"
              onClick={() => {
                selectPost(selectedPost.id);
                isEditablePost(true);
              }}>
              <VscEdit className="inline-block w-4 h-4" />
            </button>

            <DeletePostButton id={selectedPost.id} reFetchLocal={reFetchLocal} selectPost={selectPost} customOnClick={triggerPostModal} className={`px-2  hover:cursor-pointer flex items-center justify-center hover:text-red-600 dark:text-primary-100 hover:dark:text-red-600`} />
          </div>
        </div>
        <button
          className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center hover:cursor-pointer bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white shadow-lg rounded-full"
          onClick={() => {
            triggerPostModal();
          }}>
          <VscCloseAll />
        </button>
        <hr />
        <div id={`post-${selectedPost.id}-body`} className="text-sm text-slate-900 dark:text-primary-100 p-1 py-2 pl-2  overflow-y-auto h-5/6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedPost.body}</ReactMarkdown>
        </div>
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

export default PostModalDisplayMode;
