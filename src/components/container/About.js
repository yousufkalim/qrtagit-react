/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../css/App.css';
import Navbar from '../common/Navbar';
import QRTag from '../../images/about-QRTag.svg';
import DownloadLink from '../common/DownloadLink';
import BasicModal from '../common/BasicModal';
import { useLocation } from 'react-router-dom';

function About() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {location?.state?.error && <BasicModal />}
      <div className='About_Container'>
        <h3>About Us</h3>
        <div className='About_ImageDiv'>
          <img src={QRTag} />
        </div>
        <div className='About_TextDiv'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
            sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
            sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
            scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
            urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia.
            Aliquam in elementum tellus.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
            sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
            sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
            scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
            urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia.
            Aliquam in elementum tellus.
          </p>
        </div>
      </div>
      <DownloadLink />
    </>
  );
}

export default About;
