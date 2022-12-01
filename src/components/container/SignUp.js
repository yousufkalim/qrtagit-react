/* eslint-disable jsx-a11y/alt-text */
import '../css/App.css';
import QR_BG from '../../images/login-bg.svg';
import FB_Logo from '../../images/facebook-logo.svg';
import Apple_Logo from '../../images/apple-logo.svg';
import Google_Logo from '../../images/google-logo.svg';
import HidePassword from '../../images/hide-password.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  async function signUp() {
    let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (formState.name === '') {
      toast.error('Name cannot be empty');
    } else if (formState.email === '') {
      toast.error('Email cannot be empty');
    } else if (regex.test(formState.email) === false) {
      toast.error('Invalid email');
    } else if (formState.phone === '') {
      toast.error('Phone number cannot be empty');
    } else if (formState.password === '') {
      toast.error('Password cannot be empty');
    } else if (formState.password.length < '8') {
      toast.error('Password must be atleast 8 characters');
    } else {
      if (loading) {
        return;
      }
      setLoading((s) => !s);
      try {
        const user = await Auth.signUp({
          username: formState.email,
          password: formState.password,
          attributes: {
            phone_number: formState.phone,
            name: formState.name,
          },
        });
        // nav('/verificationcode');
        nav('/verificationcode', { state: { username: formState.email } });
        console.log(user);
        setLoading((s) => !s);
      } catch (error) {
        setLoading((s) => !s);
        if (error.message === 'Invalid phone number format.') {
          toast.error('Invalid phone number format.');
        } else if (error.message === 'An account with the given email already exists') {
          toast.error('An account with the given email already exists');
        } else {
          toast.error(error.message);
        }
        console.log('error signing up', error);
      }
    }
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
              <h3>Sign Up</h3>
              <input
                className='LogIn_InputEmail'
                required
                value={formState.name}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, name: e.target.value }));
                }}
                type='text'
                placeholder='Full Name'
              />
              <input
                className='LogIn_InputEmail'
                required
                value={formState.email}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, email: e.target.value }));
                }}
                type='email'
                placeholder='Email '
              />
              <input
                className='LogIn_InputEmail'
                // required
                value={formState.phone}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, phone: e.target.value }));
                }}
                type='tel'
                placeholder='Phone Number'
              />
              <div className='LogIn_InputPasswordDiv'>
                <input
                  className='LogIn_InputPassword'
                  required
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
            {/* <div className='LogIn_ForgotPasswordDiv'>
              <p>Forgot password?</p>
            </div> */}
            <div className='LogIn_BtnDiv' onClick={signUp}>
              <Link className='LogIn_Btn'>
                {!loading ? <div> Sign Up</div> : <PulseLoader size={15} color='#ffffff' />}
              </Link>
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
                Already have an account?{' '}
                <Link to='/' style={{ color: '#0A3F74', fontWeight: '700' }}>
                  Sign In
                </Link>
              </p>
            </div>
            <div className='LogIn_DividerDiv'>
              <div className='LogIn_Divider' />
              <p>OR</p>
              <div className='LogIn_Divider' />
            </div>
            <div className='LogIn_SignInOptions'>
              <p>Sign up with</p>
            </div>
            <div className='LogIn_SocialContainer'>
              <div className='LogIn_SocialDiv'>
                <img src={FB_Logo} />
                <img src={Apple_Logo} />
                <img src={Google_Logo} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
