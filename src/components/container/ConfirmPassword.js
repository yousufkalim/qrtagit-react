/* eslint-disable jsx-a11y/alt-text */
import '../css/App.css';
import QR_BG from '../../images/login-bg.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { toast } from 'react-toastify';

import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmPassword() {
  const nav = useNavigate();
  const { state } = useLocation();
  // const username = state?.username;
  const [username] = useState(state?.username);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    code: '',
    password: '',
    confirmpassword: '',
  });
  // console.log(username, 'username');
  async function forgetPassword() {
    try {
      setLoading((s) => !s);
      const user = await Auth.forgotPassword(username);
      console.log(user, 'Verification code sent');
      toast.success('Verification code sent');
      // nav('/confirmpassword', { state: { username: formState.email } });
    } catch (error) {
      toast.error(error.message);
      console.log('error signing up', error);
    }
    setLoading((s) => !s);
  }
  // 166854
  async function confirmPassword() {
    if (formState.code === '') {
      toast.error('Confirmation code cannot be empty');
    } else if (formState.password === '') {
      toast.error('Password cannot be empty');
    } else if (formState.password.length < '8') {
      toast.error('Password must be at least 8 characters');
    } else if (formState.confirmpassword === '') {
      toast.error('confirm password cannot be empty');
    } else if (formState.confirmpassword !== formState.password) {
      toast.error('passwords doesnot match');
    } else {
      try {
        setLoading((s) => !s);
        const user = await Auth.forgotPasswordSubmit(username, formState.code, formState.password);
        console.log(user, 'Password Updated');
        nav('/');
        toast.success('Password Updated');
      } catch (error) {
        if (error.message === 'Invalid verification code provided, please try again.') {
          toast.error('Invalid verification code provided, please try again.');
        } else if (error.message === 'Attempt limit exceeded, please try after some time.') {
          toast.error('Attempt limit exceeded, please try after some time.');
        } else {
          toast.error(error.message);
        }
        console.log('error signing up', error);
      }
      setLoading((s) => !s);
    }
  }
  // 677731
  return (
    <>
      <div className='LogInContainer'>
        <div className='LogIn_ImageDiv'>
          <img className='LogIn_Image' src={QR_BG} />
        </div>
        <div className='LogIn_RightDiv'>
          <form className='LogIn_FormDiv' onSubmit={(e) => e.preventDefault()}>
            <div className='LogIn_HeadingDiv'>
              <h2>New Password</h2>
              <p>To continue please enter the 6 digit token sent to your email/phone number</p>
            </div>
            <div className='LogIn_InputDiv'>
              <input
                className='LogIn_InputEmail'
                required
                value={formState.code}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, code: e.target.value }));
                }}
                type='text'
                placeholder='Code'
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
              <div className='LogIn_InputPasswordDiv'>
                <input
                  className='LogIn_InputPassword'
                  required
                  value={formState.confirmpassword}
                  onChange={(e) => {
                    setFormState((f) => ({ ...f, confirmpassword: e.target.value }));
                  }}
                  type={!showConfirmPassword ? 'password' : 'text'}
                  placeholder='Confrim Password'
                />
                {/* <img
                  style={{ cursor: 'pointer' }}
                  src={HidePassword}
                  onClick={() => setShowPassword(!showPassword)}
                /> */}
                <div>
                  {showConfirmPassword ? (
                    <VisibilityOutlinedIcon
                      style={{ color: '#818181', cursor: 'pointer' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      style={{ color: '#818181', cursor: 'pointer' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className='LogIn_BtnDiv' onClick={confirmPassword}>
              <button className='LogIn_Btn'>
                {!loading ? <div> Submit</div> : <PulseLoader size={15} color='#ffffff' />}
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
                Didn't receive token?{' '}
                <button
                  style={{
                    color: '#0A3F74',
                    fontWeight: '700',
                    border: 'none',
                    background: 'transparent',
                  }}
                  onClick={forgetPassword}
                >
                  Request again
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConfirmPassword;
