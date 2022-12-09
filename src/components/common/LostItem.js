/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import BasicModal from './locationPopup';
import Axios from '../../config/axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import About from '../container/About';

function LostItem() {
  let { uid } = useParams();
  const navigate = useNavigate();

  const [lostItem, setLostItem] = useState({});
  const [mainImage, setMainImage] = useState();

  const getLostItems = () => {
    Axios.get(`/looser/find-item/${uid}/`)
      .then((response) => {
        if (!response.data) {
          window.location = '/*';
        }
        setLostItem(response?.data);
        setMainImage(response?.data?.photos[0]?.photo);
        console.log(response, 'li');
      })
      .catch((error) => {
        navigate('/*', {
          state: { error: true },
        });
        console.log(error, 'er');
      });
  };

  useEffect(() => {
    getLostItems();
  }, []);

  return (
    <>
      <div className='LostItem_Container'>
        <h2>Lost Item</h2>

        <div className='LostItem_BodyDiv'>
          <div className='LostItem_ImageDiv'>
            <div className='LostItem_UpperImageDiv'>
              <img src={mainImage} />
            </div>
            <div className='LostItem_LowerImageDiv'>
              {lostItem?.photos?.map((item) => {
                return <img onClick={() => setMainImage(item.photo)} src={item.photo} />;
              })}
            </div>
          </div>
          <div className='LostItem_TextDiv'>
            <div className='LostItem_TitleDiv'>
              <h3>{lostItem?.name}</h3>
              <p>Edit Details</p>
            </div>
            <div className='LostItem_DetailDiv'>
              <p>$50 reward if returned</p>
              <p>
                <b>Item ID:</b> {lostItem?.id}
              </p>
              <p className='LostItem_Manufacturer'>
                <b>Manufacturer: </b>
                {lostItem?.manufacturer}
              </p>
              <p>
                <b>Description:</b>
              </p>
              <p className='LostItem_Description'>{lostItem?.description}</p>
            </div>
            <div className='LostItem_Divider' />
            <div className='LostItem_HistoryDiv'>
              <p className='LostItem_History_H'>
                <b>History</b>
              </p>
              {lostItem?.history?.map((item) => {
                return (
                  <div className='LostItem_History_P'>
                    <p>
                      <b>Item {item.status}</b>
                    </p>
                    <p>
                      {new Date(item?.date).toLocaleTimeString()} |
                      {new Date(item?.date).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}

              <div className='LostItem_History_P'>
                <p style={{ color: '#831212' }}>
                  <b>Item Lost</b>
                </p>
                <p>08:55 PM | 06/30/22</p>
              </div>
            </div>
            <div className='LostItem_Divider' />
            <div className='LostItem_BtnDiv'>
              <p>
                This item is currently <span>lost</span>.
              </p>
              <div className='LostItem_FoundBtn'>
                <BasicModal btnText='Mark as found' btnColor='#ffffff' location />
              </div>
              <div className='LostItem_ChatBtn'>
                <BasicModal btnText='Chat with owner' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LostItem;
