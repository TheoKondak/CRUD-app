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
    const selectedPost: Post = posts ? posts.filter((post) => post.id === Number(postId)) : null;
    setPost(selectedPost);
  };

  // Form Functions
  // console.log(formInUpdateMode);
  // console.log(modalVisible, editablePost, post);
  return (
    <div className="App bg-white dark:bg-primary-800">
      {settings ? <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} /> : <Loading />}

      <div className="flex items-center justify-center">{settings && posts ? <Posts posts={posts} settings={{ postSettings: settings.view.post, triggerPostModal, isEditablePost }} selectPost={selectPost} /> : <Loading />}</div>

      {settings ? <Footer settings={settings.view.footer} /> : <Loading />}

      {settings && post ? <BaseModalWrapper settings={{ triggerPostModal, modalVisible, isEditablePost, setModalVisible, editablePost, reFetchPosts, selectPost, setEditablePost }} post={post} /> : <Loading />}
    </div>
  );
}

export default App;
