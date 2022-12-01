import './components/css/App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Admin from './components/container/Admin';
import Home from './components/container/Home';
import Scanned from './components/container/Scanned';
import NotFound from './components/NotFound';
import About from './components/container/About';
import Login from './components/container/Login';
import SignUp from './components/container/SignUp';
import ForgetPassword from './components/container/ForgetPassword';
import ConfirmPassword from './components/container/ConfirmPassword';
import VerificationCode from './components/container/VerificationCode';
import Store from './components/Store';

import Chat from './components/container/Chat';
import { useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event, data } = payload;
      console.log('event', event);
      // eslint-disable-next-line default-case
      switch (event) {
        case 'signIn':
          setIsLogin(true);
          Auth.currentAuthenticatedUser().then((res) => {
            console.log({ res });
            localStorage.setItem('userData', JSON.stringify(res.attributes));
          });

          localStorage.setItem('isLoggedIn', 'true');
          // localStorage.setItem('userData', JSON.stringify(data.attributes));
          console.log({
            event,
            data,
            signInUserSession: JSON.stringify(data.signInUserSession.accessToken.jwtToken),
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

        case 'cognitoHostedUI':
          break;

        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    return () => Hub.remove('auth');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='uuid/:uid' element={<Scanned />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/confirmpassword' element={<ConfirmPassword />} />
        <Route path='/verificationcode' element={<VerificationCode />} />
        {/* localStorage.getItem('i18nextLng') === 'fr' */}
        {/* {localStorage.getItem('amplify-redirected-from-hosted-ui') === 'true' ? (
          <Route path='/' element={<About />} />
        ) : (
          <Route path='/' element={<Login />} />
        )} */}
        {!isLogin ? (
          <Route path='/' element={<Login />} />
        ) : (
          <>
            <Route path='admin' element={<Admin />} />
            <Route path='/viewitems' element={<Home />} />
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='store' element={<Store />} />

            <Route path='/' element={<About />} />
            <Route path='/about' element={<About />} />
          </>
        )}
      </Routes>
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
}

export default App;
