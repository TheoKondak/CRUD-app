import { useState, useEffect } from 'react';

import { VscSaveAll, VscError, VscCloseAll, VscDebugRestart } from 'react-icons/vsc';

import { toast } from 'react-toastify';

import postsService from '../../services/postsService';
import DeletePostButton from '../DeletePostButton';
import Input from './Input';
import TextArea from './TextArea';

type Props = {
  isEditablePost: Function;
  setModalVisible: Function;
  post: Post;
  reFetchLocal: Function;
  setPosts: Function;
  posts: Post[];
};

const Form = ({ post, isEditablePost, setModalVisible, reFetchLocal, posts, setPosts }: Props) => {
  const unchangedPost = post;
  const [postTitle, setPostTitle] = useState(post.title);
  const [postBody, setPostBody] = useState(post.body);
  const [serverPosts, setServerPosts] = useState<Posts | []>([]);

  useEffect(() => {
    postsService.get('/posts').then((posts) => setServerPosts(posts));
  }, []);

  const onSubmit: Function = (event) => {
    event.preventDefault();
    const existsOnServer = serverPosts.filter((serverPost) => serverPost.id === post.id).length === 0 ? false : true;

    if (existsOnServer) {
      if (postTitle.length === 0) {
        if (window.confirm(`Cannot Save a post with an empty title. \n Press ok to exit without saving, or cancel to continue editing`)) {
          isEditablePost(false);
          setModalVisible(false);
        }
      } else {
        const updatedPost = { ...post, title: postTitle, body: postBody };
        postsService.upd(`posts/${post.id}`, updatedPost);
        isEditablePost(false);
        setModalVisible(false);
        setPosts(posts.concat(updatedPost));
        reFetchLocal();
      }
    } else {
      if (postTitle.length === 0) {
        if (window.confirm(`Cannot Save a post with an empty title. \n Press ok to exit without saving, or cancel to continue editing`)) {
          isEditablePost(false);
          setModalVisible(false);
          toast('Exited without Saving');
        }
      } else {
        const updatedPost = { ...post, title: postTitle, body: postBody };
        postsService.create(updatedPost);
        toast('Post Saved');
        isEditablePost(false);
        setModalVisible(false);
        reFetchLocal();
      }
    }
  };

  const onSubmitAndClose = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  const onCancel: Function = (event) => {
    event.preventDefault();

    if (unchangedPost.title !== postTitle || unchangedPost.body !== postBody) {
      if (window.confirm(`Are you sure you want to exit? Changes will be lost.`)) {
        isEditablePost(false);
        setModalVisible(false);
        toast('Exited post without saving');
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
    toast('Changes reset');
  };

  // Handle Form Fields Updates. Used on Blur to update this component, to prevent unnecessary rerenders of the whole Form component.
  const onBlurInputTitleUpdate = (event) => setPostTitle(event.target.value);
  const onBlurTextareaBodyUpdate = (event) => setPostBody(event.target.value);

  return (
    <form id={`post-${post.id}`} className={`relative h-full w-full text-white  px-4 py-4 mx-auto z-20`}>
      <div id={`post-${post.id}-header`} className=" flex items-center justify-between">
        <Input onBlur={onBlurInputTitleUpdate} value={postTitle} />
      </div>
      <button name="Close Post" className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center hover:cursor-pointer bg-secondary-600 dark:bg-primary-700 text-white  shadow-lg rounded-full" onClick={onCancel}>
        <VscCloseAll />
      </button>
      <hr />
      <div id={`post-${post.id}-body`} className="text-md pt-2 h-4/6">
        <TextArea onBlur={onBlurTextareaBodyUpdate} value={postBody} />
      </div>
      <div className=" w-full flex items-center justify-end flex-wrap md:flex-nowrap gap-2 my-2">
        <button title="Save Post" className={`btn btn-success`} onClick={onSubmitAndClose}>
          <VscSaveAll className="inline-block w-4 h-4 mr-2" /> Save & Close
        </button>
        {/* <button title="Save Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.success}`} onClick={onSubmit}>
          <VscSaveAll className="inline-block w-4 h-4 mr-2" /> Save
        </button> */}

        <DeletePostButton id={post.id} reFetchLocal={reFetchLocal} className={`btn btn-danger`} customOnClick={setModalVisible} text="Delete Post" />

        <button
          title="Reset"
          className={`btn btn-danger`}
          onClick={(event) => {
            onResetChanges(event);
          }}>
          <VscDebugRestart className="inline-block w-4 h-4 mr-2" /> Reset
        </button>
        <button title="Cancel" className={`btn btn-default`} onClick={onCancel}>
          <VscError className="inline-block" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
