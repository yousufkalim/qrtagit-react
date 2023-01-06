import Axios from '../config/axios';
import { UpdateStoreRef } from '../StoreContext';

export const RecieveChannelList = (callback = ({ success, data }) => {}) => {
  Axios.get(`/message/channel-list`)
    .then((response) => {
      console.log('recieveChannelList res', response);
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

export const HandleMessageHistory = (item, callback = ({ success, data }) => {}) => {
  Axios.get(`/message/?channel=${item.id}`)
    .then((response) => {
      // setMessageList(response?.data);
      console.log('recieveMessageList response', response);
      callback({ success: true, data: response?.data });
    })
    .catch((error) => {
      console.log(' recieveMessageList error', error);
      callback({ success: false });
    });
};
