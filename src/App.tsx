import { useState, useEffect } from 'react';

// Services
import postsService from './services/postsService';

// Components
import Header from './components/Header';
import Loading from './components/Loading';
import Posts from './components/Posts';
import Footer from './components/Footer';
import BaseModalWrapper from './components/modal/BaseModalWrapper';

// CSS
import './App.css';
import Search from './components/Search';

function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  //  Modal
  const [refetchPosts, setRefetchPosts] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editablePost, setEditablePost] = useState<boolean>(false);
  // const [formInUpdateMode, setFormInUpdateMode] = useState<boolean>(false);

  // Search
  const [search, setSearch] = useState('');

  // Form
  // const [editPostTitle, setEditPostTitle]= useState<string>('')
  // const [editPostBody, setEditPostBody]= useState<string>('')

  // Data Fetching
  useEffect(() => {
    postsService.get('/posts').then((posts) => {
      setPosts(posts);
    });
  }, [refetchPosts]);

  useEffect(() => {
    postsService.get('/settings').then((settings?: Object) => {
      setSettings(settings);
    });
  }, []);

  // Modal Functions
  // const updateFormMode = (isUpdateMode: boolean = false) => {
  //   isUpdateMode ? setFormInUpdateMode(true) : setFormInUpdateMode(false);
  // };
  const triggerPostModal: React.MouseEventHandler<HTMLDivElement> = () => setModalVisible((modalVisible) => !modalVisible);
  const reFetchPosts = () => setRefetchPosts(!refetchPosts);
  const isEditablePost: React.MouseEventHandler<HTMLButtonElement> = (isEdditable: boolean = false) => {
    isEdditable ? setEditablePost(true) : setEditablePost(false);
    // isEdditable ? setModalVisible(true) : setModalVisible(false);
  };
  const selectPost = (postId: number) => {
    const selectedPost: Post = posts
      ? posts.filter((post) => {
          return post.id === Number(postId);
        })
      : null;

    setPost(selectedPost);
  };

  // Search Functions
  const handleSearchFieldUpdate = (event) => setSearch(event.target.value.toLowerCase());

  // Add Post
  const addPost = () => {
    const newPostId: number | void = posts ? Math.max(...posts.map((post) => post.id)) + 1 : console.error('Some Error Occured. Failed to create new post, because post fetching failed');
    const newUserId: number | void = posts ? Math.max(...posts.map((post) => post.userId)) + 1 : console.error('Some Error Occured. Failed to create new post, because post fetching failed');
    const newPost = { userId: newUserId, id: newPostId, title: '', body: '' };
    setPosts(posts.concat(newPost));
    setPost([newPost]);

    triggerPostModal(true);
    isEditablePost(true);
    // postsService.create(newPost).then((returnedPost) => {

    // });
  };

  return (
    <div className="bg-primary-100 dark:bg-primary-800 flex flex-col items-center justify-start w-full h-full ">
      {settings ? <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} /> : <Loading />}
      <div className="bg-primary-500 dark:bg-primary-700 flex items-center justify-center gap-5 w-5/6 mt-4 -mb-10  md:-mb-10  mx-auto md:m-10 pb-14 pt-20 rounded-md shadow-2xl">
        <Search placeholder="Search for a post" onChange={handleSearchFieldUpdate} setPosts={setPosts} />

        <button
          className="btn btn-default block"
          title="Add a new post"
          onClick={() => {
            addPost();
          }}>
          Add Post
        </button>
        <button
          className="btn btn-default block"
          title="Fetch a random post from JSONPlaceholder"
          onClick={() => {
            console.log('WIP: Fetch random post');
          }}>
          Fetch a random post
        </button>
      </div>
      <div className="flex items-center justify-center h-4/6 max-w-5/6">{settings && posts ? <Posts posts={posts.filter((post) => (search.length === 0 ? post : post.title.toLowerCase().includes(search)))} settings={{ postSettings: settings.view.post, triggerPostModal, isEditablePost }} selectPost={selectPost} /> : <Loading />}</div>

      {settings ? <Footer settings={settings.view.footer} /> : <Loading />}

      {settings && posts ? <BaseModalWrapper settings={{ triggerPostModal, modalVisible, isEditablePost, setModalVisible, editablePost, reFetchPosts, selectPost, setEditablePost }} post={post} /> : <Loading />}
    </div>
  );
}

export default App;
