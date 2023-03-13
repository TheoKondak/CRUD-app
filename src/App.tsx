import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);

  //  Modal
  const [posts, setPosts] = useState<Posts | null>(null);
  const [externalPosts, setExternalPosts] = useState<Post[] | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [refetchPosts, setRefetchPosts] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editablePost, setEditablePost] = useState<boolean>(false);
  // const [formInUpdateMode, setFormInUpdateMode] = useState<boolean>(false);

  // Search
  const [search, setSearch] = useState('');

  // Form
  // const [editPostTitle, setEditPostTitle]= useState<string>('')
  // const [editPostBody, setEditPostBody]= useState<string>('')

  // Data Fetching
  const reFetchLocal = () => {
    setRefetchPosts(!refetchPosts);
    // console.log('refetched');
  };

  useEffect(() => {
    postsService.get('/posts').then((posts) => {
      setPosts(posts);
    });
  }, [refetchPosts]);

  useEffect(() => {
    postsService.get('/settings').then((settings?: Object) => {
      setSettings(settings);
      setIsDarkTheme(settings.view.theme.darkThemeByDefault);
    });
  }, []);

  useEffect(() => {
    postsService.getExternal('https://jsonplaceholder.typicode.com/posts').then((posts?: Post[]) => {
      setExternalPosts(posts);
    });
  }, []);

  // Modal Functions

  const triggerPostModal: Function = () => {
    setModalVisible((modalVisible) => !modalVisible);
  };

  const isEditablePost: Function = (isEditable: boolean = false) => {
    isEditable ? setEditablePost(true) : setEditablePost(false);
    // isEditable ? setModalVisible(true) : setModalVisible(false);
  };
  const selectPost = (postId: number) => {
    const selectedPost: Post | null = posts
      ? posts.filter((post) => {
          return post.id === Number(postId);
        })
      : null;

    setPost(selectedPost);
  };

  // Search Functions
  const handleSearchFieldUpdate = (event: React.MouseEventHandler<HTMLDivElement>) => setSearch(event.target.value.toLowerCase());

  // Add Post
  const addPost = () => {
    const newPostId: number | void = posts && posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
    // Since there are no specific instructions for userIds, i decided to just create a new user ID for each new post. This is easy to update.
    const newUserId: number | void = posts && posts.length > 0 ? Math.max(...posts.map((post) => post.userId)) + 1 : 1;
    const newPost = { userId: newUserId, id: newPostId, title: '', body: '' };

    setPost([newPost]);

    // console.log('userid:', newUserId, 'id:', newPostId);

    triggerPostModal(true);
    isEditablePost(true);
  };

  // Add Random External Post
  const addRandomExternalPost: Function = (posts: Post[], externalPosts: Post[]) => {
    for (let i = 0; i < externalPosts.length; i++) {
      // Fetch a post that has either unique title or unique body
      const firstUniquePost = externalPosts.find((externalPost) => {
        return !posts.some((localPost) => localPost.title === externalPost.title || localPost.body === externalPost.body) && externalPosts.indexOf(externalPost) === externalPosts.findIndex((post) => post.title === externalPost.title && post.body === externalPost.body);
      });

      // Creating a new ID because the incoming posts, might have duplicate IDs. So instead I create a new ID
      const newPostId: number | void = posts ? Math.max(...posts.map((post) => post.id)) + 1 : console.error('Some Error Occured. Failed to create new post, because post fetching failed');
      const newPost = { userId: firstUniquePost.userId, id: newPostId, title: firstUniquePost.title, body: firstUniquePost.body };
      setPosts(posts.concat(newPost));
      postsService.create(newPost).then(() => reFetchLocal());
      toast('New Post Fetched');
      if (!posts.includes(newPost)) {
        break;
      }
    }
  };

  return (
    <div className="bg-primary-100 dark:bg-slate-500 flex flex-col items-center justify-start w-full h-screen ">
      {posts && settings && externalPosts ? (
        <div className="w-full h-full inset-0 fixed overflow-hidden flex flex-col items-stretch justify-between ">
          <Header logo={settings.view.logo} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
          <div className="bg-primary-800 dark:bg-primary-800 flex flex-col md:flex-row items-center justify-center gap-5 w-5/6 mt-4 -mb-8 md:-mb-10 md:m-10 mx-auto md:mx-auto pb-16 p-10 md:pt-20 rounded-md shadow-2xl">
            <div className="w-5/6 flex items-center justify-center">
              <Search placeholder="Search for a post" onChange={handleSearchFieldUpdate} setPosts={setPosts} />
            </div>
            <div className="max-w-max flex gap-2 items-center justify-center  whitespace-nowrap">
              <button
                className="btn btn-default btn-lg block max-w-max"
                title="Add a new post"
                onClick={() => {
                  addPost();
                }}>
                Add Post
              </button>

              <button className="btn btn-default btn-lg block max-w-max whitespace-nowrap" title="Fetch a random post from JSONPlaceholder" onClick={() => addRandomExternalPost(posts, externalPosts)}>
                Conjure Post
              </button>
            </div>
          </div>
          <div className="flex items-start justify-center max-w-5/6 h-5/6 rounded-md overflow-y-auto">
            <Posts posts={posts.filter((post) => (search.length === 0 ? post : post.title.toLowerCase().includes(search)))} settings={{ postSettings: settings.view.post, triggerPostModal, isEditablePost }} selectPost={selectPost} reFetchLocal={reFetchLocal} />
          </div>

          <Footer settings={settings.view.footer} />

          <BaseModalWrapper settings={{ triggerPostModal, modalVisible, isEditablePost, setModalVisible, editablePost, reFetchLocal, selectPost, setEditablePost }} post={post} setPost={setPost} />
          <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={isDarkTheme ? 'dark' : 'light'} />
        </div>
      ) : (
        <Loading
          loadingData={[
            {
              text: 'Posts',
              data: posts,
            },
            {
              text: 'Settings',
              data: settings,
            },
            {
              text: 'External Posts',
              data: externalPosts,
            },
          ]}
        />
      )}
    </div>
  );
}

export default App;
