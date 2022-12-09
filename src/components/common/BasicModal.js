import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => {
    navigate('/*', { state: null });
    setOpen(false);
  };
  const closeModal = () => {
    navigate('/*', { state: null });
    setOpen(false);
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div style={{ position: 'relative', width: '100%', background: 'red' }}>
            <div
              style={{
                position: 'absolute',
                right: '0',
                //    right: '-5%',
                //  marginTop: '-7%'
              }}
              onClick={closeModal}
              //   onClose={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <Typography sx={{ marginTop: '5%' }} id='modal-modal-title' variant='h6' component='h2'>
            This Item is not Registered
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Close Modal to continue...
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
