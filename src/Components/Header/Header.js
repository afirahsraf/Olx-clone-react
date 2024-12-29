import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../Store/Context'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/config';
function Header() {
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{
            navigate('/login')
          }}>
            {user? `❤️ ${user.displayName}` :"Login"}</span>
          <hr />
        </div>
        <div className='logoutPage'>
       { user &&<span onClick={()=>{
        signOut(auth)
        navigate('/login')
       }}
       >Logout</span>}
       </div>


        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
