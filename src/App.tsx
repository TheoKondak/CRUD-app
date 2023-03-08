import { useState, useEffect } from 'react';

// Services
import postsService from './services/postsService';

// Components
import Header from './components/Header';
import Loading from './components/Loading';

// CSS
import './App.css';

function App() {
  const [settings, setSettings] = useState(null);
  const [posts, setPosts] = useState(null);
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

  return <div className="App h-screen overflow-hidden bg-white dark:bg-primary-800">{settings ? <Header logo={settings.view.logo} darkThemeByDefault={settings.view.theme.darkThemeByDefault} /> : <Loading />}</div>;
}

export default App;
