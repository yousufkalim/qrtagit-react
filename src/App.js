import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Admin from './components/container/Admin';
// import Home from './components/container/Home.js';
import Home from './components/Home';
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
import Navbar from './components/common/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Amplify } from 'aws-amplify';
import awsExports from './config/awsConfig';

// Configure Amplify!!!!
// Check if you are in localhost or production in order to configure the
// redirect URLs properly.
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.

    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.

    window.location.hostname.match(/^127(?:.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const signInURI = awsExports.oauth.redirectSignIn.split(', ');
const signOutURI = awsExports.oauth.redirectSignOut.split(', ');
if (isLocalhost) {
  awsExports.oauth.redirectSignIn = signInURI[0];
  awsExports.oauth.redirectSignOut = signOutURI[0];
} else if (window.location.hostname === 'main.d1i6i6g25r1vzu.amplifyapp.com') {
  awsExports.oauth.redirectSignIn = signInURI[2];
  awsExports.oauth.redirectSignOut = signOutURI[2];
} else if (window.location.hostname === 'dev.qrtag.it') {
  awsExports.oauth.redirectSignIn = signInURI[1];
  awsExports.oauth.redirectSignOut = signOutURI[1];
} else {
  console.log('AMPLIFY NOT CONFIGURED PROPERLY');
}
// Check if you are in localhost or production
// Now we can Configure Resources
Amplify.configure(awsExports);
// CognitoIdentityServiceProvider.2h8c3418nbiki44l50ig5fv3uo.68c72779-8b07-412d-b374-5d1956b66f64.accessToken
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
        <Route path='uid/:uid' element={<Scanned />} />
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
