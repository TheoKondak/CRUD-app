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
  postTitleLength: Object;
};

const Form = ({ post, isEditablePost, setModalVisible, reFetchLocal, postTitleLength }: Props) => {
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
        postsService.upd(`posts/${post.id}`, updatedPost).then(() => {
          reFetchLocal();
          isEditablePost(false);
          setModalVisible(false);
        });
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
        postsService.create(updatedPost).then(() => {
          reFetchLocal();
          toast('Post Saved');
          isEditablePost(false);
          setModalVisible(false);
        });
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
    <form id={`post-${post.id}`} className={`relative h-full w-full text-white  px-0 py-4 mx-auto z-20`}>
      <div id={`post-${post.id}-header`} className=" flex items-center justify-between">
        <Input onBlur={onBlurInputTitleUpdate} value={postTitle} postTitleLength={postTitleLength} />
      </div>
      <button name="Close Post" className="absolute -top-5 -right-5 w-7 h-7 flex items-center justify-center hover:cursor-pointer bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white shadow-lg rounded-full" onClick={onCancel}>
        <VscCloseAll />
      </button>
      <hr />
      <div id={`post-${post.id}-body`} className="text-md pt-2 h-4/6">
        <TextArea onBlur={onBlurTextareaBodyUpdate} value={postBody} />
      </div>
      <div className=" w-full flex items-center justify-end flex-wrap md:flex-nowrap gap-2 my-2">
        <button title="Save Post" className={`btn btn-success  btn-sm`} onClick={onSubmitAndClose}>
          <VscSaveAll className="inline-block w-4 h-4 mr-2" /> Save & Close
        </button>
        {/* <button title="Save Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.success}`} onClick={onSubmit}>
          <VscSaveAll className="inline-block w-4 h-4 mr-2" /> Save
        </button> */}

        <button
          title="Reset"
          className={`btn btn-slate btn-sm`}
          onClick={(event) => {
            onResetChanges(event);
          }}>
          <VscDebugRestart className="inline-block w-4 h-4 mr-2" /> Reset
        </button>
        <DeletePostButton id={post.id} reFetchLocal={reFetchLocal} className={`btn btn-danger  btn-sm`} customOnClick={setModalVisible} text="Delete" />

        {/* <button title="Cancel" className={`btn btn-default`} onClick={onCancel}>
          <VscError className="inline-block" /> Cancel
        </button> */}
      </div>
    </form>
  );
};

export default Form;
