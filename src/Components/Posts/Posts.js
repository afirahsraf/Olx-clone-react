import React, { useContext } from 'react';
import { useState,useEffect } from 'react';
import { getDocs,collection } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import Heart from '../../assets/Heart';
import './Post.css';
import { postContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Store/Context';

function Posts() {
  const [Product,setProduct]=useState([])
  const {setpostDetails}=useContext(postContext)
  const {user}=useContext(AuthContext) 
 const  navigate=useNavigate()
 useEffect(()=>{
 const fetchProduct= async()=>{

  try{
    const docRef = collection(db, 'products');
    //to get products
    const snapshot=await getDocs(docRef)
    //
    const allPost=snapshot.docs.map((product)=>{
      return {
        ...product.data(),
       id: product.id
      }
    })
    console.log(allPost);
    
    setProduct(allPost)

  }catch(err){

  }

 }
 fetchProduct(); // Fetch products when component mounts

 },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         {
          user&& Product.map((product)=>{
          return    <div
          className="card"
          onClick={()=>{
            setpostDetails(product)
            navigate('/view')
          }}
        >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
         })
      
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
