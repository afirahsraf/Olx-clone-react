import React, { useState,useContext,useEffect } from 'react';

import './View.css';
import { collection, getDocs,query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import { postContext } from '../../Store/PostContext';
function View() {
  const [UserDetails,setUserDetails]=useState(null)
  const {postDetails}=useContext(postContext)
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails?.userid) {
        // Define the Firestore query
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('id', '==', postDetails.userid));

        try {
          // Fetch user details from Firestore
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error('Error fetching user details: ', error);
        }
      }
    };

    fetchUserDetails();
  }, [postDetails]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 250000 </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{UserDetails?.username}</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
