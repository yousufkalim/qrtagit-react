import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Admin from './components/container/Admin';
import Home from './components/container/Home.js';
import Scanned from './components/container/Scanned';
import NotFound from './components/NotFound';
import About from './components/container/About';
import Login from './components/container/Login';
import Chat from './components/container/Chat';
import { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify';
import Navbar from './components/common/Navbar';
function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event, data } = payload;
      // eslint-disable-next-line default-case
      switch (event) {
        case 'signIn':
          setIsLogin(true);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(data.attributes));
          console.log({
            event,
            data,
            signInUserSession: JSON.stringify(
              data.signInUserSession.accessToken.jwtToken
            ),
          });
          break;
        case 'autoSignIn':
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          localStorage.setItem('isLoggedIn', 'false');

          setIsLogin(false);

          break;
      }
    });
    return () => Hub.remove('auth');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='uid/:uid' element={<Scanned />} />
        <Route path='/chat' element={<Chat />} />

        {!isLogin ? (
          <Route path='/' element={<Login />} />
        ) : (
          <>
            <Route path='admin' element={<Admin />} />
            <Route path='/viewitems' element={<Home />} />
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/' element={<About />} />
            <Route path='/about' element={<About />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
