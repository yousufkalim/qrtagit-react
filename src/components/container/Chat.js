/* eslint-disable jsx-a11y/alt-text */
import '../../App.css';
import Navbar from '../common/Navbar';
import Search from '../../images/search-icon.svg';
import { ReactComponent as DoubleTick } from '../../images/double-tick.svg';
import AvatarLogo from '../../images/navbar-avatar.png';
import AttachIcon from '../../images/attach-icon.svg';
import SendIcon from '../../images/send_icon.svg';
import { useState } from 'react';

function Chat() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div className='Chat_MainContainer'>
        <div className='Chat_LeftContainer'>
          <h3>Messages</h3>
          <div className='Chat_LeftContainer_SearchDiv'>
            <input type='text' placeholder='Search' />
            <img src={Search} />
          </div>
          <div className='Chat_MessagesList'>
            <div
              style={{
                background: '#0A3F741A',
              }}
            >
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <DoubleTick className='doubleTick' fill='#0C80A0' />
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
            <div>
              <div className='Chat_MessageBox'>
                <div className='Chat_MessageBox_Avatar'>
                  <img src={AvatarLogo} />
                </div>
                <div className='Chat_MessageBox_Text'>
                  <p className='Chat_MessageBox_Text_P'>Kite</p>
                  <p>April fool's day</p>
                </div>
                <div className='Chat_MessageBox_DateDiv'>
                  <p>Today, 9.52pm</p>
                  <div className='Chat_MessageBox_Status'>
                    <div className='Chat_MessageBox_Count'>1</div>
                  </div>
                </div>
              </div>
              <div className='Chat_MessageBox_Divider' />
            </div>
          </div>
        </div>
        <div className='Chat_RightContainer'>
          <div>
            <div className='Chat_RightContainer_TitleDiv'>
              <div>
                <img src={AvatarLogo} />
              </div>
              <div className='Chat_SenderNameDiv'>
                <p className='Chat_MessageBox_Text_P'>Kite</p>
                <p style={{ color: '#818181' }}>Online - Last seen, 2.02pm</p>
              </div>
            </div>
            <div className='Chat_ChatDivider' />
          </div>

          <div className='Chat_ChatDiv'>
            <div className='Chat_RevievedChatDiv'>
              <div className='Chat_RevievedChatSubDiv' />
              <p className='Chat_RevievedChatSubDiv_P'>Hey There!</p>
            </div>
            <div className='Chat_RevievedChatDiv'>
              <div className='Chat_RevievedChatSubDiv' />
              <div style={{ width: '100%' }}>
                <p className='Chat_RevievedChatSubDiv_P'>How are you?</p>
                <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.30pm</p>
              </div>
            </div>

            <div className='Chat_SenderChatDiv'>
              <div className='Chat_SenderChatSubDiv'>
                <p className='Chat_SenderChatSubDiv_P'>Hello!</p>
              </div>
              <p className='Chat_SenderChatSubDiv_Time'>Today, 8.30pm</p>
            </div>
            <div className='Chat_SenderChatDiv'>
              <div className='Chat_SenderChatSubDiv'>
                <p className='Chat_SenderChatSubDiv_P'>I am fine and how are you?</p>
              </div>
              <p className='Chat_SenderChatSubDiv_Time'>Today, 8.30pm</p>
            </div>
            <div className='Chat_RevievedChatDiv'>
              <div className='Chat_RevievedChatSubDiv' />
              <div style={{ width: '100%' }}>
                <p className='Chat_RevievedChatSubDiv_P'>I am doing well, Can we meet tomorrow?</p>
                <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.30pm</p>
              </div>
            </div>
            <div className='Chat_SenderChatDiv'>
              <div className='Chat_SenderChatSubDiv'>
                <p className='Chat_SenderChatSubDiv_P'>Why?</p>
              </div>
              <p className='Chat_SenderChatSubDiv_Time'>Today, 8.30pm</p>
            </div>
            <div className='Chat_RevievedChatDiv'>
              <div className='Chat_RevievedChatSubDiv' />
              <div style={{ width: '100%' }}>
                <p className='Chat_RevievedChatSubDiv_P'>
                  I have something important to discuss.. so can we meet?
                </p>
                <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.30pm</p>
              </div>
            </div>
            <div className='Chat_SenderChatDiv'>
              <div className='Chat_SenderChatSubDiv'>
                <p className='Chat_SenderChatSubDiv_P'>No.</p>
              </div>
              <p className='Chat_SenderChatSubDiv_Time'>Today, 8.30pm</p>
            </div>
          </div>
          <div>
            <div className='Chat_TypingDivider' />
            <div className='Chat_TypingDiv' style={{ display: 'flex', alignItems: 'center' }}>
              <div className='Chat_TypingSubDiv'>
                <img src={AttachIcon} />
                <input type='text' placeholder='Type your message here...' />
              </div>
              <div className='Chat_SendBtn'>
                <img src={SendIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='Chat_MainContainer_Mob'>
        {!open ? (
          <div className='Chat_LeftContainer'>
            <h3>Messages</h3>
            <div className='Chat_LeftContainer_SearchDiv'>
              <input type='text' placeholder='Search' />
              <img src={Search} />
            </div>
            <div className='Chat_MessagesList' onClick={handleOpen}>
              <div
                style={{
                  background: '#0A3F741A',
                }}
              >
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <DoubleTick className='doubleTick' fill='#0C80A0' />
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
              <div>
                <div className='Chat_MessageBox'>
                  <div className='Chat_MessageBox_Avatar'>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_MessageBox_Text'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p>April fool's day</p>
                  </div>
                  <div className='Chat_MessageBox_DateDiv'>
                    <p>Today, 9.52pm</p>
                    <div className='Chat_MessageBox_Status'>
                      <div className='Chat_MessageBox_Count'>1</div>
                    </div>
                  </div>
                </div>
                <div className='Chat_MessageBox_Divider' />
              </div>
            </div>
          </div>
        ) : (
          <div className='Chat_RightContainer'>
            <div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div className='Chat_RightContainer_TitleDiv'>
                  <div>
                    <img src={AvatarLogo} />
                  </div>
                  <div className='Chat_SenderNameDiv'>
                    <p className='Chat_MessageBox_Text_P'>Kite</p>
                    <p style={{ color: '#818181' }}>Online - Last seen, 2.02pm</p>
                  </div>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={handleClose}>
                  <b>X</b>
                </div>
              </div>
              <div className='Chat_ChatDivider' />
            </div>

            <div className='Chat_ChatDiv'>
              <div className='Chat_RevievedChatDiv'>
                <div className='Chat_RevievedChatSubDiv' />
                <p className='Chat_RevievedChatSubDiv_P'>Hey There!</p>
              </div>
              <div className='Chat_RevievedChatDiv'>
                <div className='Chat_RevievedChatSubDiv' />
                <div style={{ width: '100%' }}>
                  <p className='Chat_RevievedChatSubDiv_P'>How are you?</p>
                  <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.30pm</p>
                </div>
              </div>

              <div className='Chat_SenderChatDiv'>
                <div className='Chat_SenderChatSubDiv'>
                  <p className='Chat_SenderChatSubDiv_P'>Hello!</p>
                </div>
                <p className='Chat_SenderChatSubDiv_Time'>Today, 8.32pm</p>
              </div>
              <div className='Chat_SenderChatDiv'>
                <div className='Chat_SenderChatSubDiv'>
                  <p className='Chat_SenderChatSubDiv_P'>I am fine and how are you?</p>
                </div>
                <p className='Chat_SenderChatSubDiv_Time'>Today, 8.32pm</p>
              </div>
              <div className='Chat_RevievedChatDiv'>
                <div className='Chat_RevievedChatSubDiv' />
                <div style={{ width: '100%' }}>
                  <p className='Chat_RevievedChatSubDiv_P'>
                    I am doing well, Can we meet tomorrow?
                  </p>
                  <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.35pm</p>
                </div>
              </div>
              <div className='Chat_SenderChatDiv'>
                <div className='Chat_SenderChatSubDiv'>
                  <p className='Chat_SenderChatSubDiv_P'>Sure! what time?</p>
                </div>
                <p className='Chat_SenderChatSubDiv_Time'>Today, 8.35pm</p>
              </div>
              <div className='Chat_RevievedChatDiv'>
                <div className='Chat_RevievedChatSubDiv' />
                <div style={{ width: '100%' }}>
                  <p className='Chat_RevievedChatSubDiv_P'>11 am?</p>
                  <p className='Chat_RevievedChatSubDiv_Time'>Today, 8.36pm</p>
                </div>
              </div>
              <div className='Chat_SenderChatDiv'>
                <div className='Chat_SenderChatSubDiv'>
                  <p className='Chat_SenderChatSubDiv_P'>Sure</p>
                </div>
                <p className='Chat_SenderChatSubDiv_Time'>Today, 8.37pm</p>
              </div>
            </div>
            <div>
              <div className='Chat_TypingDivider' />
              <div className='Chat_TypingDiv' style={{ display: 'flex', alignItems: 'center' }}>
                <div className='Chat_TypingSubDiv'>
                  <img src={AttachIcon} />
                  <input type='text' placeholder='Type your message here...' />
                </div>
                <div className='Chat_SendBtn'>
                  <img src={SendIcon} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
