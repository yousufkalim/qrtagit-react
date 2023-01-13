/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import QRLogo from '../../images/navbar-logo.svg';
import LogoText from '../../images/logotext.svg';
// import HomeLogo from '../../images/navbar-home-logo.svg';
import AboutIcon from '../../images/navbar-about-icon.svg';
import MessageIcon from '../../images/navbar-message-icon.svg';
import DownloadIcon from '../../images/navbar-download-icon.svg';
import Avatar from '../../images/avatar.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { Auth } from 'aws-amplify';
import { PulseLoader } from 'react-spinners';
import { Store, ResetStore } from '../../StoreContext';

function Navbar() {
  const { user, loggedIn } = Store();
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className='Navbar_Container'>
        <div className='Navbar_LogoDiv'>
          <img className='Navbar_Logo' src={QRLogo} />
          <img className='Navbar_LogoText' src={LogoText} />
        </div>
        <div className='Navbar_MenuContainer'>
          <div className='Navbar_MenuDiv'>
            <Link to='/about' className='Navbar_MenuLinks'>
              <img src={AboutIcon} />
              <p>About Us</p>
            </Link>
            <Link to='/chat' className='Navbar_MenuLinks'>
              <img src={MessageIcon} />
              <p>Messages</p>
            </Link>
            <Link to='/store' className='Navbar_MenuLinks'>
              <ShoppingCartOutlinedIcon sx={{ color: '#fff' }} />
              <p>Store</p>
            </Link>
            <Link to='/viewitems' className='Navbar_MenuLinks'>
              <img src={DownloadIcon} />
              <p>Download Our App</p>
            </Link>
          </div>
          {!loggedIn ? (
            <ListItemButton
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className='LogIn_BtnDiv' onClick={handleClick}>
                <button className='LogIn_BtnWeb' onClick={() => (window.location = '/')}>
                  <div> Sign In</div>
                </button>
                <div className='expandIconsMob'>
                  {open ? (
                    <CloseIcon sx={{ color: '#ffffff' }} />
                  ) : (
                    <MenuIcon sx={{ color: '#ffffff' }} />
                  )}
                </div>
              </div>
            </ListItemButton>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '30%',
                position: 'relative',
              }}
            >
              <ListItemButton sx={{ width: '100%' }} onClick={handleClick}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <img
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                    src={user?.looser?.profile_picture ? user?.looser?.profile_picture : Avatar}
                  />
                  <p
                    style={{
                      color: '#ffffff',
                      margin: '0 5%',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user?.name || 'User'}
                  </p>
                  {open ? (
                    <ExpandLess sx={{ color: '#ffffff' }} />
                  ) : (
                    <ExpandMore sx={{ color: '#ffffff' }} />
                  )}
                </div>
              </ListItemButton>
            </div>
          )}
        </div>
      </div>
      <Collapse className='Navbar_CollapseDiv' in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {loggedIn && (
            <>
              <ListItemButton>
                <ListItemText>
                  <div className='Navbar_CollapseText'>{user?.name || 'Username'}</div>
                </ListItemText>
              </ListItemButton>

              <div className='Navbar_CollapseDivider' />
              <ListItemButton>
                <ListItemText>
                  <div className='Navbar_CollapseText'>{user?.email || 'user@qrtagit.com'}</div>
                </ListItemText>
              </ListItemButton>
              <div className='Navbar_CollapseDivider' />
            </>
          )}
          <div className='Navbar_CollapseDiv_Mob'>
            <ListItemButton>
              <ListItemText sx={{ margin: '0' }}>
                <Link to='/about' className='Navbar_CollapseText'>
                  <p>About Us</p>
                </Link>
              </ListItemText>
            </ListItemButton>
            <div className='Navbar_CollapseDivider' />
            <ListItemButton>
              <ListItemText sx={{ margin: '0' }}>
                <Link to='/chat' className='Navbar_CollapseText'>
                  <p>Messages</p>
                </Link>
              </ListItemText>
            </ListItemButton>
            <div className='Navbar_CollapseDivider' />
            <ListItemButton>
              <ListItemText sx={{ margin: '0' }}>
                <Link to='/store' className='Navbar_CollapseText'>
                  <p>Store</p>
                </Link>
              </ListItemText>
            </ListItemButton>
            <div className='Navbar_CollapseDivider' />
            <ListItemButton>
              <ListItemText sx={{ margin: '0' }}>
                <Link to='/viewitems' className='Navbar_CollapseText'>
                  <p>Download</p>
                </Link>
              </ListItemText>
            </ListItemButton>
            <div className='Navbar_CollapseDivider' />
            {!loggedIn && (
              <ListItemButton onClick={() => (window.location = '/')}>
                <ListItemText>
                  <div className='Navbar_SignOutDiv'>
                    <div className='Navbar_CollapseText'> SignIn</div>
                    <div>{loading && <PulseLoader size={10} color='#0A3F74' />}</div>
                  </div>
                </ListItemText>
              </ListItemButton>
            )}
          </div>
          {loggedIn && (
            <ListItemButton
              onClick={() => {
                if (loading) {
                  return;
                }
                setLoading((s) => !s);
                Auth.signOut().finally(() => {
                  nav('/');
                });
                ResetStore();
              }}
            >
              <ListItemText>
                <div className='Navbar_SignOutDiv'>
                  <div className='Navbar_CollapseText'> SignOut</div>
                  <div>{loading && <PulseLoader size={10} color='#0A3F74' />}</div>
                </div>
              </ListItemText>
            </ListItemButton>
          )}
        </List>
      </Collapse>
    </>
  );
}

export default Navbar;
