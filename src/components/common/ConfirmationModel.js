import * as React from "react";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, onConfirm }) {
  //   const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    navigate("/about", { state: null });
    setOpen(false);
  };
  const closeModal = () => {
    navigate("/about", { state: null });
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            borderRadius: "15px",
            width: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            // textAlign: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%" }}>
            <div
              style={{
                position: "absolute",
                right: "0",
                right: "-5%",
                marginTop: "-7%",
              }}
              onClick={closeModal}
              onClose={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <Typography
            sx={{ marginTop: "5%", marginBottom: "5%" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Are you sure ?
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sign Out...
          </Typography> */}
          <button
            style={{
              border: "none",
              borderRadius: "5px",
              color: "red",
              padding: "2% 5%",
            }}
            onClick={onConfirm}
          >
            {" "}
            Sign Out
          </button>
        </Box>
      </Modal>
    </div>
  );
}
