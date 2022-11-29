/* eslint-disable jsx-a11y/alt-text */
import '../../App.css';
import QR_BG from '../../images/login-bg.svg';
import FB_Logo from '../../images/facebook-logo.svg';
import Apple_Logo from '../../images/apple-logo.svg';
import Google_Logo from '../../images/google-logo.svg';
import HidePassword from '../../images/hide-password.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import SignUp from './SignUp';
// import { toast } from "react-toastify";
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
function Login() {
  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  let [loading, setLoading] = useState();
  // const toast = toast({ position: toast.POSITION.BOTTOM_RIGHT });
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  async function signIn() {
    // if (!Object.values(formState).every(Boolean)) {
    //   toast.error('Fields cannot be empty', { position: toast.POSITION.BOTTOM_RIGHT });
    //   return;
    // }
    let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (formState.email === '') {
      toast.error('email cannot be empty');
    } else if (regex.test(formState.email) === false) {
      toast.error('Invalid Email');
    } else if (formState.password === '') {
      toast.error('Password cannot be empty');
    } else {
      if (loading) {
        return;
      }
      setLoading((s) => !s);
      try {
        const user = await Auth.signIn(formState.email, formState.password);
        nav('/');
        setLoading((s) => !s);
        toast.success('Login Successfully');
      } catch (error) {
        setLoading((s) => !s);

        if (error.message === 'User is not confirmed.') {
          toast.error('User is not confirmed.');
        } else if (error.message === 'Incorrect username or password.') {
          toast.error('Incorrect username or password.');
        } else {
          toast.error(error.message);
        }
        console.log('error signing in', error.message);

        resendConfirmationCode();
      }
    }
  }

  async function resendConfirmationCode() {
    if (loading) {
      return;
    }
    setLoading((s) => !s);
    try {
      await Auth.resendSignUp(formState.email);
      console.log('code resent successfully');
      nav('/verificationcode', { state: { username: formState.email } });
    } catch (err) {
      console.log('error resending code: ', err);
    }
    setLoading((s) => !s);
  }

  return (
    <>
      <div className='LogInContainer'>
        <div className='LogIn_ImageDiv'>
          <img className='LogIn_Image' src={QR_BG} />
        </div>
        <div className='LogIn_RightDiv'>
          <form className='LogIn_FormDiv' onSubmit={(e) => e.preventDefault()}>
            <div className='LogIn_HeadingDiv'>
              <h2>Hello,</h2>
              <p>let’s help find your lost item</p>
            </div>
            <div className='LogIn_InputDiv'>
              <h3>Login</h3>
              <input
                className='LogIn_InputEmail'
                // required
                value={formState.email}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, email: e.target.value }));
                }}
                type='email'
                placeholder='Email'
              />
              <div className='LogIn_InputPasswordDiv'>
                <input
                  className='LogIn_InputPassword'
                  // required
                  value={formState.password}
                  onChange={(e) => {
                    setFormState((f) => ({ ...f, password: e.target.value }));
                  }}
                  type={!showPassword ? 'password' : 'text'}
                  placeholder='Password'
                />
                {/* <img
                  style={{ cursor: 'pointer' }}
                  src={HidePassword}
                  onClick={() => setShowPassword(!showPassword)}
                /> */}
                <div>
                  {showPassword ? (
                    <VisibilityOutlinedIcon
                      style={{ color: '#818181', cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      style={{ color: '#818181', cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='LogIn_ForgotPasswordDiv'>
              <Link to='forgetpassword' className='LogIn_ForgotPasswordLink'>
                Forgot password?
              </Link>
            </div>
            <div className='LogIn_BtnDiv' onClick={signIn}>
              <button className='LogIn_Btn'>
                {!loading ? <div> Sign In</div> : <PulseLoader size={15} color='#ffffff' />}
              </button>
              {/* <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={60}
                aria-label='Loading Spinner'
                data-testid='loader'
              /> */}
            </div>
            <div className='LogIn_SignUpDiv'>
              <p>
                Don’t have an account?{' '}
                <Link to='/signup' style={{ color: '#0A3F74', fontWeight: '600' }}>
                  Sign up
                </Link>
              </p>
            </div>
            <div className='LogIn_DividerDiv'>
              <div className='LogIn_Divider' />
              <p>OR</p>
              <div className='LogIn_Divider' />
            </div>
            <div className='LogIn_SignInOptions'>
              <p>Sign in with</p>
            </div>
            <div className='LogIn_SocialContainer'>
              <div className='LogIn_SocialDiv'>
                <div
                  onClick={() =>
                    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })
                  }
                >
                  <img style={{ width: '100%' }} src={FB_Logo} />
                </div>
                <div
                  onClick={() =>
                    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple })
                  }
                >
                  <img style={{ width: '100%' }} src={Apple_Logo} />
                </div>
                <div
                  onClick={() =>
                    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
                  }
                >
                  <img style={{ width: '100%' }} src={Google_Logo} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
