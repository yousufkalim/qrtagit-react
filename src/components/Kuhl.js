import kuhlHeader from '../images/KUHL-Header.png';
import kuhlLogo from '../images/KUHL-Logo.png';
import './Kuhl.css';
// import {v4 as uuidv4} from 'uuid'
import { QRCodeSVG } from 'qrcode.react';


function Kuhl() {

  //let uuid = uuidv4();
  let qrTagValue = "kuhl.qrtag.it?recylce=true"

  return (
    <div className="App">
      <header className="App-header">
        <img src={kuhlHeader} alt="kuhl logo" />
        <p>
          {/* UUID: {uuid} */}
        </p>        
        <QRCodeSVG value={qrTagValue} level='Q' size="500" imageSettings={{
          src: kuhlLogo, 
          excavate: false,
          width: 120,
          height: 150
        }}/>
      </header>
    </div>
  );
}

export default Kuhl;
