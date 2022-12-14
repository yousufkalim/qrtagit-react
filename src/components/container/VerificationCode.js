/* eslint-disable jsx-a11y/alt-text */
import '../css/App.css';
import QR_BG from '../../images/login-bg.svg';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactCodeInput from 'react-code-input';
// import { reactCodeInput } from 'CodeInputField.scss';

function VerificationCode() {
  const { state } = useLocation();
  const [username] = useState(state?.username);
  const nav = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  let [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    code: '',
    password: '',
    confirmpassword: '',
  });
  async function resendConfirmationCode() {
    if (loading) {
      return;
    }
    setLoading((s) => !s);
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully', { username });
      toast.success('code resent successfully');
    } catch (err) {
      toast.error(err);
      console.log('error resending code: ', err);
    }
    setLoading((s) => !s);
  }

  useEffect(() => {
    if (!username) nav('/');
    // if()
  }, []);

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, formState.code);
      console.log('user confirmed');
      nav('/');
      toast.success('User Verified!');
    } catch (error) {
      if (error.message === 'Confirmation code cannot be empty') {
        toast.error('Confirmation code cannot be empty.');
      } else {
        toast.error('Invalid verification code provided, please try again.');
      }
      console.log('error confirming sign up', error);
    }
  }

  return (
    <>
      <div className='LogInContainer'>
        {console.log(username, 'sign up email')}
        <div className='LogIn_ImageDiv'>
          <img className='LogIn_Image' src={QR_BG} />
        </div>
        <div className='LogIn_RightDiv'>
          <form className='LogIn_FormDiv' onSubmit={(e) => e.preventDefault()}>
            <div className='LogIn_HeadingDiv'>
              <h2>Verification Code</h2>
              <p>To continue please enter the 6 digit token sent to your email/phone number</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ReactCodeInput
                className='OtpInputBox'
                fields={6}
                value={formState.code}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, code: e }));
                }}
              />
              {/* <OtpInput
                className='OtpInputBox'
                numInputs={6}
                value={formState.code}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, code: e }));
                }}
              /> */}
              {/* <input
                className='LogIn_InputEmail'
                required
                value={formState.code}
                onChange={(e) => {
                  setFormState((s) => ({ ...s, code: e.target.value }));
                }}
                type='text'
                placeholder='Code'
              /> */}
            </div>

            <div className='LogIn_BtnDiv'>
              <button onClick={confirmSignUp} className='LogIn_Btn'>
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
            <div className='LogIn_SignUpDiv' onClick={resendConfirmationCode}>
              <p>
                Didn't receive token?{' '}
                <Link style={{ color: '#000', fontWeight: '700' }}>Request again</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VerificationCode;
