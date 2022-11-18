import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Kuhl from './components/Kuhl';
import KuhlRecyle from './components/KuhlRecylce';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Determine which root element will be utilized based on the domain/host name.
// const hostname = "kuhl.qrtag.it"
// const hostname = "www.qrtag.it"
const hostname = window.location.hostname
const host = hostname.split(".")[0]

let rootComponent = ""
switch (host) {
  case "kuhl":
    rootComponent = (<KuhlRecyle />)
    break;
  case "www":
      rootComponent = (<App />)
      break;
  default: 
  rootComponent = (<App />)
}

root.render(
  <React.StrictMode>
    {rootComponent}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
