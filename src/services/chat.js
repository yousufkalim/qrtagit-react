import Axios from "../config/axios";
import { UpdateStoreRef } from "../StoreContext";

export const RecieveChannelList = (
  id,
  callback = ({ success, data }) => {}
) => {
  Axios.get(`/message/channel-list/?user_id=${id}`)
    .then((response) => {
      console.log("recieveChannelList res", response);
      UpdateStoreRef.current.updateStore({
        channels: response.data.sort(
          (a, b) =>
            new Date(b?.last_message?.created_at).valueOf() -
            new Date(a?.last_message?.created_at).valueOf()
        ),
      });
      callback({ success: true, data: response?.data });
    })
    .catch((error) => {
      callback({ success: false });
    });
};

export const HandleMessageHistory = (
  item,
  callback = ({ success, data }) => {}
) => {
  Axios.get(`/message/?channel=${item.id}`)
    .then((response) => {
      // setMessageList(response?.data);
      console.log("recieveMessageList response", response);
      callback({ success: true, data: response?.data });
    })
    .catch((error) => {
      console.log(" recieveMessageList error", error);
      callback({ success: false });
    });
};

export const HandleMessageHistoryByID = (
  id,
  callback = ({ success, data }) => {}
) => {
  Axios.get(`/message/?user_id=${id}`)
    .then((response) => {
      // setMessageList(response?.data);
      console.log("recieveMessageList response", response);
      callback({ success: true, data: response?.data });
    })
    .catch((error) => {
      console.log(" recieveMessageList error", error);
      callback({ success: false });
    });
};

export const GetChannelID = (
  postData,
  callback = ({ success, data }) => {}
) => {
  Axios.post(`/message/get-channel/`, postData)
    .then((response) => {
      // setMessageList(response?.data);
      console.log("GetChannelID response", response);
      callback({ success: true, data: response?.data });
    })
    .catch((error) => {
      console.log(" GetChannelID error", error);
      callback({ success: false });
    });
};
