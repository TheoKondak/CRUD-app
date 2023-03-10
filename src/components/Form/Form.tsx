import { useState } from 'react';

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

  const onSubmit: Function = async (event) => {
    event.preventDefault();
    const updatedPost = { ...post, title: postTitle, body: postBody };
    postsService.upd(`posts/${post.id}`, updatedPost);
    console.log('PostSaved');
    await reFetchPosts();
  };

  const onSubmitAndClose = (event) => {
    event.preventDefault();
    onSubmit(event).then(() => {
      console.log('Refetching');
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
        // Source https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
        // const duplicateEntryId = personsData.findIndex((person) => person.name === newNameEntry) + 1; // Array id start from 0 , while the personsData ids start from 1
        // const person = personsData.find((n) => n.id === duplicateEntryId);
        // const changedPerson = { ...person, number: newPhoneEntry };
        // const newPersonsData = [...personsData];
        // newPersonsData[duplicateEntryId - 1] = changedPerson;
        // // Update Entry
        // phonebookService.update(duplicateEntryId, changedPerson, {
        //   message: `'${changedPerson.name}' has been updated`,
        //   duration: 5000, // in ms
        //   setNotificationMessage: setNotificationMessage,
        // });
        // setPersonsData(newPersonsData);
        // If user cancels the new entry
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

  // Ideally this should be extended to work in a separate Button component, that would work across the whole application.
  const formButtonStyles = {
    basicButtonStyles: `hover:cursor-pointer  flex items-center justify-center rounded-lg px-5 py-1 shadow-inner-2xl text-white text-sm`,
    default: `border-2 border-secondary-900; hover:border-tertiary-700 bg-secondary-700 hover:bg-secondary-600`,
    success: `border-2 border-secondary-900; hover:border-success-700 bg-secondary-700 hover:bg-secondary-600`,
    danger: `border-2 border-secondary-900; hover:border-danger-700 bg-secondary-700 hover:bg-secondary-600`,
  };

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
        <button title="Save Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.success}`} onClick={onSubmitAndClose}>
          <VscSaveAll className="inline-block w-4 h-4" /> Save & Close
        </button>
        <button title="Save Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.success}`} onClick={onSubmit}>
          <VscSaveAll className="inline-block w-4 h-4" /> Save
        </button>
        <button title="Reset" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.danger}`} onClick={onResetChanges}>
          <VscDebugRestart className="inline-block w-4 h-4" /> Reset
        </button>
        <button title="Delete Post" className={`${formButtonStyles.basicButtonStyles} ${formButtonStyles.default}`} onClick={onCancel}>
          <VscError className="inline-block" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
