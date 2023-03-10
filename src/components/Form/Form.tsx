import { useState, useEffect } from 'react';

import { VscSaveAll, VscError, VscCloseAll, VscDebugRestart } from 'react-icons/vsc';

import postsService from '../../services/postsService';
import Input from './Input';
import TextArea from './TextArea';

type Props = {
  isEditablePost: Function;
  setModalVisible: Function;
  post: Post;
  reFetchPosts: Function;
};

const Form = ({ post, isEditablePost, setModalVisible, reFetchPosts }: Props) => {
  const [unchangedPost, setUnchangedPost] = useState<Post>(post);
  const [postTitle, setPostTitle] = useState(post.title);
  const [postBody, setPostBody] = useState(post.body);
  const [serverPosts, setServerPosts] = useState<Posts | []>([]);

  useEffect(() => {
    postsService.get('/posts').then((posts) => setServerPosts(posts));
  }, []);

  const onSubmit: Function = async (event) => {
    event.preventDefault();

    const existsOnServer = serverPosts.filter((serverPost) => serverPost.id === post.id).length === 0 ? false : true;

    if (existsOnServer) {
      const updatedPost = { ...post, title: postTitle, body: postBody };
      postsService.upd(`posts/${post.id}`, updatedPost);
    } else {
      postsService.create(post);
    }

    console.log('PostSaved');
    await reFetchPosts();
  };

  const onSubmitAndClose = (event) => {
    event.preventDefault();
    onSubmit(event).then(() => {
      reFetchPosts();
    });

    isEditablePost(false);
    setModalVisible(false);
  };

  const onCancel: Function = (event) => {
    event.preventDefault();

    if (unchangedPost.title !== postTitle || unchangedPost.body !== postBody) {
      if (window.confirm(`Are you sure you want to exit? Changes will be lost.`)) {
        isEditablePost(false);
        setModalVisible(false);
      }
    } else {
      isEditablePost(false);
      setModalVisible(false);
    }
  };

  const onResetChanges = (event) => {
    event?.preventDefault();
    setPostTitle(unchangedPost.title);
    setPostBody(unchangedPost.body);
  };

  const handleInputTitleUpdate = (event) => setPostTitle(event.target.value);

  const handleTextareaBodyUpdate = (event) => setPostBody(event.target.value);

  return (
    <form id={`post-${post.id}`} className={`relative h-full w-full text-white  px-4 py-4 mx-auto z-20`}>
      <div id={`post-${post.id}-header`} className=" flex items-center justify-between">
        <Input onChange={handleInputTitleUpdate} placeholder={postTitle} value={postTitle} />
      </div>
      <button name="Close Post" className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center hover:cursor-pointer bg-secondary-600 dark:bg-primary-700 text-white  shadow-lg rounded-full" onClick={onCancel}>
        <VscCloseAll />
      </button>
      <hr />
      <div id={`post-${post.id}-body`} className="text-md pt-2 h-4/6">
        <TextArea onChange={handleTextareaBodyUpdate} placeholder={postBody} value={postBody} />
      </div>
      <div className=" w-full flex items-center justify-end flex-wrap md:flex-nowrap gap-2 my-2">
        <button title="Save Post" className={`btn btn-success`} onClick={onSubmitAndClose}>
          <VscSaveAll className="inline-block w-4 h-4" /> Save & Close
        </button>
        {/* <button title="Save Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.success}`} onClick={onSubmit}>
          <VscSaveAll className="inline-block w-4 h-4" /> Save
        </button> */}
        <button title="Reset" className={`btn btn-danger`} onClick={onResetChanges}>
          <VscDebugRestart className="inline-block w-4 h-4" /> Reset
        </button>
        <button title="Delete Post" className={`btn btn-default`} onClick={onCancel}>
          <VscError className="inline-block" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
