/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import AppStore from '../../images/app-store.png';
import PlayStore from '../../images/play-store.png';

function DownloadLink() {
  return (
    <>
      <div className='DownloadLink_Container'>
        <h2>DOWNLOAD THE QR TAG IT APP NOW</h2>
        <p>
          What are you waiting for? Download the QR Tag It App now! The user interface of QR Tag It
          is simple and easy to navigate
        </p>
        <div className='DownloadLink_StoreDiv'>
          <img src={AppStore} />
          <img src={PlayStore} />
        </div>
      </div>
    </>
  );
}

export default DownloadLink;
