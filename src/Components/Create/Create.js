import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../Store/Context';
import axios from 'axios';
import Card from '../../Store/Card';
import { addDoc,collection} from 'firebase/firestore';
import { db } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const date=new Date()
  const navigate=useNavigate()
  // Handle image upload to Cloudinary
  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    console.log(user);
    
    if (!image || !name || !category || !price) {
      alert('Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); // Append the file to formData
    formData.append('upload_preset', 'olxReact'); // Your Cloudinary preset name
    formData.append('cloud_name', 'dgqciw2eh'); // Your Cloudinary cloud name

    try {
      // Upload the image to Cloudinary
      const response = await axios.post
      ('https://api.cloudinary.com/v1_1/dgqciw2eh/image/upload',formData);
     const url = response.data.secure_url;
      console.log('File uploaded successfully:', url);
      
      const productData = {
        name,
        category,
        price,
        url,
        userId: user?.uid,
        createdAt:date.toDateString()// Store userId if logged in
      };
      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Document written with ID:', docRef.id);

      // Reset form fields after submission
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);

      //redirect to home
      navigate('/')
      
   
    } catch (err) {
      console.log('Error uploading file:', err);
    }
  };

  return (
    <Fragment>
      <Header />
      <Card>
        <div className="centerDiv">
          <form onSubmit={handleUpload}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input"
              type="text"
              id="name"
              name="name"
              required
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="input"
              type="text"
              id="category"
              name="category"
              required
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              type="number"
              id="price"
              value={price}
              name="price"
              required
            />
            <br />
            <label htmlFor="image">Image</label>
            <br />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              required
            />
            <br />
            <br />
            {image && (
              <div>
                <img
                  alt="Preview"
                  width="200px"
                  height="200px"
                  src={image? URL.createObjectURL(image): ''}
                />
              </div>
            )}
            <br />
            <button type="submit" className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </Card>
    </Fragment>
  );
};

export default Create;
