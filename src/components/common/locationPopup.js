import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { GetChannelID, RecieveChannelList } from "../../services/chat";
import { Store } from "../../StoreContext";
import { PulseLoader } from "react-spinners";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  padding: "1% 0",
};

export default function BasicModal(props) {
  const { user } = Store();
  const nav = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const data = props?.data;
  return (
    <div>
      <Button
        sx={{
          color: props.btnColor ? props.btnColor : "#0A3F74",
          fontWeight: "600",
          width: "100%",
        }}
        onClick={handleOpen}
      >
        {props.btnText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.location ? (
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>Allow this app to use your location?</p>
              <div
                style={{
                  height: "1px",
                  background: "#DDDDDD",
                  width: "100%",
                  margin: "3% 0",
                  padding: "0",
                }}
              />
              <p
                style={{ margin: "2% 0", fontWeight: "600", color: "#348E3D" }}
              >
                Allow Once
              </p>
              <div
                style={{
                  height: "1px",
                  background: "#DDDDDD",
                  width: "100%",
                  margin: "3% 0",
                  padding: "0",
                }}
              />
              <p
                style={{ margin: "2% 0", fontWeight: "600", color: "#1C1C1C" }}
              >
                Allow While Using
              </p>
              <div
                style={{
                  height: "1px",
                  background: "#DDDDDD",
                  width: "100%",
                  margin: "3% 0",
                  padding: "0",
                }}
              />
              <p
                style={{ margin: "2% 0", fontWeight: "600", color: "#FF5757" }}
              >
                Don’t Allow
              </p>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <p>Chat with owner</p>

              <div
                style={{
                  height: "1px",
                  background: "#DDDDDD",
                  width: "100%",
                  padding: "0",
                }}
              />
              <Button
                onClick={() => {
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
                          nav("/chat");
                        });
                    }
                  );
                }}
                style={{
                  // margin: "2% 0",
                  height: 60,
                  width: "100%",
                  fontWeight: "600",
                  color: "#0C80A0",
                }}
              >
                {!loading ? (
                  <div> Start Chat</div>
                ) : (
                  <PulseLoader size={15} color="#0C80A0" />
                )}
              </Button>
              <div
                style={{
                  height: "1px",
                  background: "#DDDDDD",
                  width: "100%",
                  padding: "0",
                }}
              />
              <Button
                onClick={() => {
                  nav("/");
                }}
                style={{
                  // margin: "2% 0",
                  height: 60,
                  width: "100%",
                  fontWeight: "600",
                  color: "#0C80A0",
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
