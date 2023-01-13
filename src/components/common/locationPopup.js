import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { GetChannelID, RecieveChannelList } from '../../services/chat';
import { UpdateStore, Store as ContextStore } from '../../StoreContext';

// import { Store } from '../../StoreContext';
import { PulseLoader } from 'react-spinners';
import { detectIncognito } from 'detect-incognito';
import { toast } from 'react-toastify';
import { getToken } from 'firebase/messaging';
import { messaging } from '../../config/firebase';
import { HandleTempUser } from '../../services/user';
import { determineDeviceType } from '../../utils/functions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '20px',
  boxShadow: 24,
  padding: '1% 0',
};

export default function BasicModal(props) {
  const { loggedIn, user, channels, firebaseToken } = ContextStore();
  const [permission, setPermission] = React.useState(null);
  const nav = useNavigate();
  const updateStore = UpdateStore();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = props?.data;
  React.useEffect(() => {
    // if ('Notification' in window) {
    setPermission(Notification.permission);
    // }
  }, []);

  React.useEffect(() => {
    if (firebaseToken) {
      const device_type = determineDeviceType();
      console.log({ device_type });
      !user.id && HandleTempUser({ registration_id: firebaseToken, device_type });
    }
  }, [firebaseToken, permission]);

  React.useEffect(() => {
    if (!loggedIn) {
      getToken(messaging)
        .then((firebaseToken) => {
          updateStore({ firebaseToken });
        })
        .catch((firebaseError) => console.log({ firebaseError }));
    }
  }, [permission]);

  const isIncognito = () => {
    detectIncognito()
      .then((res) => {
        if (res.isPrivate && !loggedIn) {
          toast.error('You cannot chat in Incognito Mode', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          if (!loggedIn) {
            if (permission === 'granted') {
              if (firebaseToken) {
                setLoading(true);
                GetChannelID(
                  {
                    send_by: user.id,
                    send_to: data.user_id,
                  },
                  ({ success }) => {
                    success &&
                      RecieveChannelList(user.id, () => {
                        setLoading(false);
                        nav('/chat');
                      });
                  }
                );
              } else {
                toast.error('Push notification is not supported, try using another broswer');
              }
            } else {
              toast.error('Enable Notifications', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          } else {
            setLoading(true);
            GetChannelID(
              {
                send_by: user.id,
                send_to: data.user_id,
              },
              ({ success }) => {
                success &&
                  RecieveChannelList(user.id, () => {
                    setLoading(false);
                    nav('/chat');
                  });
              }
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button
        sx={{
          color: props.btnColor ? props.btnColor : '#0A3F74',
          fontWeight: '600',
          width: '100%',
        }}
        onClick={handleOpen}
      >
        {props.btnText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {props.location ? (
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>Allow this app to use your location?</p>
              <div
                style={{
                  height: '1px',
                  background: '#DDDDDD',
                  width: '100%',
                  margin: '3% 0',
                  padding: '0',
                }}
              />
              <p style={{ margin: '2% 0', fontWeight: '600', color: '#348E3D' }}>Allow Once</p>
              <div
                style={{
                  height: '1px',
                  background: '#DDDDDD',
                  width: '100%',
                  margin: '3% 0',
                  padding: '0',
                }}
              />
              <p style={{ margin: '2% 0', fontWeight: '600', color: '#1C1C1C' }}>
                Allow While Using
              </p>
              <div
                style={{
                  height: '1px',
                  background: '#DDDDDD',
                  width: '100%',
                  margin: '3% 0',
                  padding: '0',
                }}
              />
              <p style={{ margin: '2% 0', fontWeight: '600', color: '#FF5757' }}>Don’t Allow</p>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 20,
              }}
            >
              <p>Chat with owner</p>

              <div
                style={{
                  height: '1px',
                  background: '#DDDDDD',
                  width: '100%',
                  padding: '0',
                }}
              />
              <Button
                onClick={() => {
                  isIncognito();
                }}
                style={{
                  // margin: "2% 0",
                  height: 60,
                  width: '100%',
                  fontWeight: '600',
                  color: '#0C80A0',
                }}
              >
                {!loading ? <div> Start Chat</div> : <PulseLoader size={15} color='#0C80A0' />}
              </Button>
              <div
                style={{
                  height: '1px',
                  background: '#DDDDDD',
                  width: '100%',
                  padding: '0',
                }}
              />
              <Button
                onClick={() => {
                  nav('/signup');
                }}
                style={{
                  // margin: "2% 0",
                  height: 60,
                  width: '100%',
                  fontWeight: '600',
                  color: '#0C80A0',
                }}
              >
                Create an account
              </Button>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
