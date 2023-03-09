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
  const [editablePost, setEditablePost] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
    postsService.get('/posts').then((posts) => {
      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    postsService.get('/settings').then((settings?: Object) => {
      setSettings(settings);
    });
  }, []);

  const reFetchPosts = () => setRefetchPosts(!refetchPosts);

  const triggerPostModal: React.MouseEventHandler<HTMLDivElement> = () => setModalVisible((modalVisible) => !modalVisible);

  const triggerIsEditablePost: React.MouseEventHandler<HTMLDivElement> = () => setEditablePost((editablePost) => !editablePost);

  const selectPost = (posts, postId) => {
    const selectedPost: Post = posts ? posts.filter((post) => post.id === Number(postId)) : null;
    setPost(selectedPost);
  };

  return (
    <div className="App bg-white dark:bg-primary-800">
      {settings ? <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} /> : <Loading />}

      {settings && posts ? <Posts posts={posts} settings={settings.view.post} /> : <Loading />}

      {settings ? <Footer settings={settings.view.footer} /> : <Loading />}

      {settings ? <BaseModalWrapper settings={{ triggerPostModal, modalVisible, triggerIsEditablePost, editablePost, reFetchPosts }} post={post} /> : <Loading />}
    </div>
  );
}

export default App;
