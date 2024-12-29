import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth, db } from '../../Firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth'; // Import updateProfile function

export default function Signup() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Basic Validation
     if (!Username || !Email || !PhoneNumber || !Password) {
      alert("All fields are required.");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(Email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation (only digits and 10 digits long)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(PhoneNumber)) {
      alert("Please enter a valid phone number (10 digits).");
      return;
    }

    // Password validation (minimum 6 characters)
    if (Password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, Email, Password)
      console.log('User created:', result.user);

      // Update the user profile with the username using the updateProfile function
      await updateProfile(result.user, { displayName: Username });

      // Add user details to Firestore
      await addDoc(collection(db, 'users'), {
        id: result.user.uid,
        username: Username,
        phone: PhoneNumber,
      });

      // Navigate to the login page after successful signup
      navigate("/login");

    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={Username}
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={PhoneNumber}
            name="phone"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={Password}
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={()=>{
          navigate('/login')
        }}>Login</a>
      </div>
    </div>
  );
}