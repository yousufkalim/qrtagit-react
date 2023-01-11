/* eslint-disable jsx-a11y/alt-text */
import "../css/App.css";
import Navbar from "../common/Navbar";
import Search from "../../images/search-icon.svg";
import { ReactComponent as DoubleTick } from "../../images/double-tick.svg";
import Avatar from "../../images/avatar.png";
import AttachIcon from "../../images/attach-icon.svg";
import SendIcon from "../../images/send_icon.svg";
import { useEffect, useRef, useState } from "react";
import { usePubNub } from "pubnub-react";
import Axios from "../../config/axios";
import { Store, UpdateStore } from "../../StoreContext";
import {
  RecieveChannelList,
  HandleMessageHistory,
  HandleMessageHistoryByID,
} from "../../services/chat";
import moment from "moment";
function Chat() {
  const { loggedIn, user, channels: channelList } = Store();
  const updateStore = UpdateStore();
  const pubnub = usePubNub();
  const subscribe = useRef(false);
  const [activeChannel, setActiveChannel] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const sender = activeChannel?.users?.find((item) => user?.id !== item?.id);
  const handleMessage = (event) => {
    console.log(event);
    setMessageList((m) =>
      [
        {
          text: event.message.text,
          send_by: event.publisher.split("User")[0],
          send_by_temp: event.publisher.split("User")[0],
          channel: event.channel,
        },
      ].concat(m)
    );
  };
  const sendMessage = (message) => {
    if (message) {
      pubnub
        .publish({
          channel: [activeChannel.id],
          message: { text: message, user },
        })
        .then((res) => {
          console.log("Message sent ", res, activeChannel.id, message);
          setMessage("");
          // recieveChannelList();
        })
        .catch((err) => console.log("send messaeg Error ===> ", err));
    }
    const sendto = activeChannel?.users?.find((item) => user?.id !== item?.id);
    const obj = JSON.stringify({
      send_by: user.id,
      send_to: sendto?.id,
      channel: activeChannel.id,
      text: message,
    });
    Axios.post(`/message/add-message`, obj)
      .then((res) => {
        // handleMessageHistory(activeChannel);
        console.log("addmessages api res =>", res);
      })
      .catch((error) => {
        console.log("addmessages api error", error);
      });
  };
  useEffect(() => {
    pubnub.setUUID(user.id + "User");
    let listener = { message: handleMessage };
    pubnub.addListener(listener);
    // pubnub.subscribe({ channels: channelList.map((c) => c.id) });
    return () => {
      pubnub.removeListener(listener);
    };
  }, [pubnub]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    RecieveChannelList(user.id);
  }, []);

  console.log(messageList);

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="Chat_MainContainer">
        <div className="Chat_LeftContainer">
          <h3>Messages</h3>
          <div className="Chat_LeftContainer_SearchDiv">
            <input type="text" placeholder="Search" />
            <img src={Search} />
          </div>
          <div className="Chat_MessagesList">
            <div
              style={{
                background: "#0A3F741A",
                width: "100%",
              }}
            >
              {channelList?.map((item) => {
                const receivedUser =
                  user?.email === item?.users[0]?.email
                    ? item?.users[1]
                    : item?.users[0];
                const lastMessage = item?.last_message?.text;
                return (
                  <>
                    <div
                      className="Chat_MessageBox"
                      onClick={() => {
                        setActiveChannel(item);
                        !loggedIn
                          ? HandleMessageHistoryByID(
                              user.id,
                              ({ success, data }) => {
                                success && setMessageList(data);
                              }
                            )
                          : HandleMessageHistory(item, ({ success, data }) => {
                              success && setMessageList(data);
                            });
                      }}
                    >
                      <div className="Chat_MessageBox_Avatar">
                        <img
                          src={
                            receivedUser?.looser?.profile_picture
                              ? receivedUser?.looser?.profile_picture
                              : Avatar
                          }
                        />
                      </div>
                      <div className="Chat_MessageBox_Text">
                        <p className="Chat_MessageBox_Text_P">
                          {receivedUser.name || receivedUser.email}
                        </p>
                        <p>
                          {lastMessage?.length > 16
                            ? lastMessage.slice(0, 16) + "..."
                            : lastMessage}
                        </p>
                      </div>
                      <div className="Chat_MessageBox_DateDiv">
                        <p>
                          {moment(item.last_message?.created_at).calendar()}
                        </p>
                        <div className="Chat_MessageBox_Status">
                          <DoubleTick className="doubleTick" fill="#0C80A0" />
                        </div>
                      </div>
                    </div>
                    <div className="Chat_MessageBox_Divider" />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="Chat_RightContainer">
          <div style={{ width: "100%" }}>
            {sender ? (
              <div className="Chat_RightContainer_TitleDiv">
                <div className="Chat_RightContainer_ImageDiv">
                  <img
                    src={
                      sender?.looser?.profile_picture
                        ? sender?.looser?.profile_picture
                        : Avatar
                    }
                  />
                </div>
                <div className="Chat_SenderNameDiv">
                  <p className="Chat_MessageBox_Text_P">
                    {sender?.name || sender?.email}
                  </p>
                  <p style={{ color: "#818181" }}>Online - Last seen, 2.02pm</p>
                </div>
              </div>
            ) : (
              <div
                style={{ fontSize: "3rem", fontWeight: "600", margin: "0 2%" }}
              >
                Start Chat
              </div>
            )}

            <div className="Chat_ChatDivider" />
          </div>

          <div className="Chat_ChatDiv">
            {messageList.map((item, index) => {
              const isSender = loggedIn
                ? item.send_by === user.id
                : item.send_by_temp === user.id;
              return (
                <>
                  {messageList.length > 1 ? (
                    <>
                      {isSender ? (
                        <div className="Chat_SenderChatDiv">
                          <div className="Chat_SenderChatSubDiv">
                            <div
                              key={`message-${index}`}
                              className="Chat_SenderChatSubDiv_P"
                            >
                              {item.text}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="Chat_RevievedChatDiv">
                          <div className="Chat_RevievedChatSubDiv" />
                          <div className="Chat_RevievedChatSubDiv_P">
                            {item?.text}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
          <div>
            <div className="Chat_TypingDivider" />
            {sender ? (
              <div
                className="Chat_TypingDiv"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="Chat_TypingSubDiv">
                  <img src={AttachIcon} />
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onKeyPress={(e) => {
                      const trimmedMessage = message?.trim();
                      if (!trimmedMessage) {
                        return;
                      } else if (e.key !== "Enter") return;
                      sendMessage(message);
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div
                  className="Chat_SendBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    const trimmedMessage = message?.trim();
                    if (!trimmedMessage) {
                      return;
                    } else {
                      sendMessage(message);
                    }
                  }}
                >
                  <img src={SendIcon} />
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "500",
                }}
              >
                Select the channel to start chat
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="Chat_MainContainer_Mob">
        {!open ? (
          <div className="Chat_LeftContainer">
            <h3>Messages</h3>
            <div className="Chat_LeftContainer_SearchDiv">
              <input type="text" placeholder="Search" />
              <img src={Search} />
            </div>
            <div className="Chat_MessagesList" onClick={handleOpen}>
              <div
                style={{
                  background: "#0A3F741A",
                }}
              >
                {channelList?.map((item) => {
                  const receivedUser =
                    user?.email === item?.users[0]?.email
                      ? item?.users[1]
                      : item?.users[0];
                  const lastMessage = item?.last_message?.text;

                  return (
                    <>
                      <div
                        className="Chat_MessageBox"
                        onClick={() => {
                          setActiveChannel(item);
                          !loggedIn
                            ? HandleMessageHistoryByID(
                                user.id,
                                ({ success, data }) => {
                                  success && setMessageList(data);
                                }
                              )
                            : HandleMessageHistory(
                                item,
                                ({ success, data }) => {
                                  success && setMessageList(data);
                                }
                              );
                        }}
                      >
                        <div className="Chat_MessageBox_Avatar">
                          <img
                            src={
                              receivedUser?.looser?.profile_picture
                                ? receivedUser?.looser?.profile_picture
                                : Avatar
                            }
                          />
                        </div>
                        <div className="Chat_MessageBox_Text">
                          <p className="Chat_MessageBox_Text_P">
                            {receivedUser.name || receivedUser.email}
                          </p>
                          <p>
                            {lastMessage?.length > 16
                              ? lastMessage.slice(0, 16) + "..."
                              : lastMessage}
                          </p>
                        </div>
                        <div className="Chat_MessageBox_DateDiv">
                          <p>
                            {moment(item.last_message?.created_at).calendar()}
                          </p>
                          <div className="Chat_MessageBox_Status">
                            <DoubleTick className="doubleTick" fill="#0C80A0" />
                          </div>
                        </div>
                      </div>
                      <div className="Chat_MessageBox_Divider" />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="Chat_RightContainer">
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="Chat_RightContainer_TitleDiv">
                  <div className="Chat_RightContainer_ImageDiv">
                    <img
                      src={
                        sender?.looser?.profile_picture
                          ? sender?.looser?.profile_picture
                          : Avatar
                      }
                    />
                  </div>
                  <div className="Chat_SenderNameDiv">
                    <p className="Chat_MessageBox_Text_P">
                      {" "}
                      {sender?.name || sender?.email}
                    </p>
                    <p style={{ color: "#818181" }}>
                      Online - Last seen, 2.02pm
                    </p>
                  </div>
                </div>
                <div style={{ cursor: "pointer" }} onClick={handleClose}>
                  <b>X</b>
                </div>
              </div>
              <div className="Chat_ChatDivider" />
            </div>

            <div className="Chat_ChatDiv">
              {messageList.map((item, index) => {
                const isSender = loggedIn
                  ? item.send_by === user.id
                  : item.send_by_temp === user.id;
                return (
                  <>
                    {messageList.length > 1 ? (
                      <>
                        {isSender ? (
                          <div className="Chat_SenderChatDiv">
                            <div className="Chat_SenderChatSubDiv">
                              <div
                                key={`message-${index}`}
                                className="Chat_SenderChatSubDiv_P"
                              >
                                {item.text}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="Chat_RevievedChatDiv">
                            <div className="Chat_RevievedChatSubDiv" />
                            <div className="Chat_RevievedChatSubDiv_P">
                              {item?.text}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <h1>Start Chat</h1>
                    )}
                  </>
                );
              })}
            </div>
            <div>
              <div className="Chat_TypingDivider" />
              <div
                className="Chat_TypingDiv"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="Chat_TypingSubDiv">
                  <img src={AttachIcon} />
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onKeyPress={(e) => {
                      const trimmedMessage = message?.trim();
                      if (!trimmedMessage) {
                        return;
                      } else if (e.key !== "Enter") return;
                      sendMessage(message);
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div
                  className="Chat_SendBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    const trimmedMessage = message?.trim();
                    if (!trimmedMessage) {
                      return;
                    } else {
                      sendMessage(message);
                    }
                  }}
                >
                  <img src={SendIcon} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
