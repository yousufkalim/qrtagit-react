import './components/css/App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import Admin from './components/container/Admin';
import Home from './components/container/Home';
import Scanned from './components/container/Scanned';
// import NotFound from './components/NotFound';
import About from './components/container/About';
import Login from './components/container/Login';
import SignUp from './components/container/SignUp';
import ForgetPassword from './components/container/ForgetPassword';
import ConfirmPassword from './components/container/ConfirmPassword';
import VerificationCode from './components/container/VerificationCode';
import Store from './components/Store';
import Chat from './components/container/Chat';
import { React, useEffect } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import Axios from './config/axios';
import { UpdateStore, Store as ContextStore, ResetStore } from './StoreContext';
import { RecieveChannelList } from './services/chat';
import { toast } from 'react-toastify';
import { getToken } from 'firebase/messaging';
import { messaging, vapidKey } from './config/firebase';
import { HandleTempUser } from './services/user';
import { determineDeviceType } from './utils/functions';
import { detectIncognito } from 'detect-incognito';

const pubnub = new PubNub({
  publishKey: 'pub-c-e402503d-be87-49c1-8de2-c163e902d202',
  subscribeKey: 'sub-c-e45da188-49e0-48e6-9aec-f29c548ec6ed',
  uuid: 'sec-c-N2RhMzE3YTctNTJkMy00Zjk2LWE2NzItYjVjYzhmZGZhZWE4',
});

function App() {
  const { loggedIn, user, channels, firebaseToken } = ContextStore();

  const Reset = ResetStore();
  const updateStore = UpdateStore();
  useEffect(() => {
    if (user.id !== undefined) {
      pubnub.setUUID(user.id + 'User');
      RecieveChannelList(user.id);
      let listener = {
        message: (event) => {
          let name = event?.message?.user?.name;
          let email = event?.message?.user?.email;
          let id = event?.message?.user?.id;
          if (window.location.pathname === '/chat' || user?.id === id) {
            return;
          } else {
            toast.success('You have got a new message from ' + (name || email || 'User'));
          }
        },
      };
      pubnub.addListener(listener);
      // pubnub.subscribe({ channels: channelList.map((c) => c.id) });

      pubnub.subscribe({ channels: channels.map((c) => c.id) });
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribe({ channels: channels.map((c) => c.id) });
      };
    }
  }, [channels.length, user.id]);

  useEffect(() => {
    const hub = Hub.listen('auth', ({ payload }) => {
      const { event, data } = payload;
      // eslint-disable-next-line default-case
      switch (event) {
        case 'signIn':
          Axios.get('/users/detail/')
            // .then((res) => res.data.json())
            .then((resp) => {
              localStorage.setItem('user', JSON.stringify(resp?.data));
              updateStore({ user: resp.data, loggedIn: true });
            })
            .catch(() => {});
          // setIsLogin(true);
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
          Reset();
          break;

        case 'cognitoHostedUI':
          break;

        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    return () => hub();
  }, []);

  return (
    <PubNubProvider client={pubnub}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Navigate to={'/about'} />} />
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
          {!loggedIn ? (
            <Route path='/' element={<Login />} />
          ) : (
            <>
              <Route path='admin' element={<Admin />} />
              <Route path='/viewitems' element={<Home />} />
              {/* <Route path='/' element={<Home />} /> */}
              <Route path='store' element={<Store />} />

              <Route path='/' element={<About />} />
            </>
          )}
          <Route path='/about' element={<About />} />
        </Routes>
        <ToastContainer position='bottom-right' />
      </BrowserRouter>
    </PubNubProvider>
  );
}

export default App;
