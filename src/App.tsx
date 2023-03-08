import { useState, useEffect } from 'react';

// Services
import postsService from './services/postsService';

// Components
import Header from './components/Header';
import Loading from './components/Loading';
import Posts from './components/Posts';
import Footer from './components/Footer';

// CSS
import './App.css';

function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

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

  // console.log(settings.view.footer);

  return (
    <div className="App bg-white dark:bg-primary-800">
      {settings ? <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} /> : <Loading />}

      {settings && posts ? <Posts posts={posts} settings={settings.view.post} /> : <Loading />}

      {settings ? <Footer settings={settings.view.footer} /> : <Loading />}
    </div>
  );
}

export default App;
