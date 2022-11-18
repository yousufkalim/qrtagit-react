import kuhlHeader from '../images/KUHL-Header.png';
import logo from '../images/qrtag.png';
import kuhlRecycle from '../images/KUHL-Recycle.png';
import '../App.js'
import './Kuhl.css';


function KuhlRecycle() {
  // set the base colors for the full page.
  document.documentElement.className = "Kuhl";
  
  return (
    <div className="Kuhl container-fluid">
      <div className='row row-cols-1'>
        <div className='col text-center mb-5'>
          <img className='img-fluid' src={kuhlHeader} alt="kuhl logo"/>
        </div>
        <div className='col text-center'>          
          <a href='https://how2recycle.info' rel="noreferrer"><img src={kuhlRecycle} alt="How2Recycle Logo"/></a>
        </div>
        <div className='col text-end Kuhl-footer'>
          <div className='mt-5'>Powered by
              <div className='pe-3'>
              {/* eslint-disable-next-line */}
              <a target='_blank' href="https://qrtag.it" ><img className='Kuhl-footer-img' src={logo} width="80px" height="80px" alt="QRTag.it Logo"/></a>
              {/* eslint-disable-next-line */}
              <div><a target='_blank' href="https://qrtag.it">QRTag.it</a></div>
              </div>           
            </div>
        </div>
      </div>
    </div>
  );
}

export default KuhlRecycle;
