import Axios from "../config/axios";
import { UpdateStoreRef } from "../StoreContext";

export const HandleTempUser = (
  postData,
  callback = ({ success, data }) => {}
) => {
  Axios.post(`/users/create-temp-user/`, postData)
    .then((response) => {
      console.log("HandleTempUser res", response);

      callback({ success: true, data: response?.data });
      UpdateStoreRef.current.updateStore({
        user: { id: response.data.user_id },
      });
    })
    .catch((error) => {
      callback({ success: false });
    });
};
