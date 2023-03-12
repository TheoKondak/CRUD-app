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
  const [notificationMessage, setNotificationMessage] = useState(null);

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
  };

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
    const newPostId: number | void = posts ? Math.max(...posts.map((post) => post.id)) + 1 : console.error('Some Error Occured. Failed to create new post, because post fetching failed');
    // Since there are no specific instructions for userIds, i decided to just create a new user ID for each new post. This is easy to update.
    const newUserId: number | void = posts ? Math.max(...posts.map((post) => post.userId)) + 1 : console.error('Some Error Occured. Failed to create new post, because post fetching failed');
    const newPost = { userId: newUserId, id: newPostId, title: '', body: '' };
    posts && setPosts(posts.concat(newPost));
    setPost([newPost]);

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
      postsService.create(newPost);

      if (!posts.includes(newPost)) {
        reFetchLocal();
        break;
      }
    }
  };

  return (
    <div className="bg-primary-100 dark:bg-primary-800 flex flex-col items-center justify-start w-full h-full ">
      {posts && settings && externalPosts ? (
        <div className="w-full">
          <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} />
          <div className="bg-primary-500 dark:bg-primary-700 flex items-center justify-center gap-5 w-5/6 mt-4   md:-mb-10 md:m-10 mx-auto  md:mx-auto pb-14 pt-20 rounded-md shadow-2xl">
            <Search placeholder="Search for a post" onChange={handleSearchFieldUpdate} setPosts={setPosts} />
            <button
              className="btn btn-default block"
              title="Add a new post"
              onClick={() => {
                addPost();
              }}>
              Add Post
            </button>

            <button className="btn btn-default block" title="Fetch a random post from JSONPlaceholder" onClick={() => addRandomExternalPost(posts, externalPosts)}>
              Fetch a random post
            </button>
          </div>
          <div className="flex items-center justify-center h-4/6 max-w-5/6">
            <Posts posts={posts.filter((post) => (search.length === 0 ? post : post.title.toLowerCase().includes(search)))} settings={{ postSettings: settings.view.post, triggerPostModal, isEditablePost }} selectPost={selectPost} reFetchLocal={reFetchLocal} />
          </div>

          <Footer settings={settings.view.footer} />

          <BaseModalWrapper settings={{ triggerPostModal, modalVisible, isEditablePost, setModalVisible, editablePost, reFetchLocal, selectPost, setEditablePost }} post={post} />
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
