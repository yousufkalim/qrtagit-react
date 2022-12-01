/* eslint-disable jsx-a11y/alt-text */
import '../css/App.css';
import QR_BG from '../../images/login-bg.svg';
import FB_Logo from '../../images/facebook-logo.svg';
import Apple_Logo from '../../images/apple-logo.svg';
import Google_Logo from '../../images/google-logo.svg';
import HidePassword from '../../images/hide-password.svg';
import SignUp from './SignUp';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function ForgetPassword() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
  });
  async function forgetPassword() {
    let regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (formState.email === '') {
      toast.error('Email cannot be empty');
    } else if (regex.test(formState.email) === false) {
      toast.error('Invalid Email');
    } else {
      try {
        setLoading((s) => !s);
        const user = await Auth.forgotPassword(formState.email);
        console.log(user, 'Verification code sent');
        nav('/confirmpassword', { state: { username: formState.email } });
      } catch (error) {
        if (
          error.message ===
          'Cannot reset password for the user as there is no registered/verified email or phone_number'
        ) {
          toast.error('User not registered');
        } else toast.error(error.message);

        console.log('error signing up', error);
      }
      setLoading((s) => !s);
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
              <h2>Forgot Password?</h2>
              <p>
                Please Enter the mail associated with your account and we will send you a link to
                reset your password
              </p>
            </div>
            <div className='LogIn_InputDiv'>
              <input
                className='LogIn_InputEmail'
                value={formState.email}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, email: e.target.value }));
                }}
                type='email'
                placeholder='Email '
              />
            </div>
            <div className='LogIn_BtnDiv' onClick={forgetPassword}>
              <button className='LogIn_Btn'>
                {!loading ? <div> Finish</div> : <PulseLoader size={15} color='#ffffff' />}
              </button>
              {/* confirmpassword */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
