import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; // for Firebase v9+
import SetTimerToSpeak from '../Screens/UIScreen/Set-timer-to-speak';
import { Modal } from 'antd';
import './login.css'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSignUp = () => {
    history.push('/signup')
  }

  const handleLogin = async (e) => {
    // e.preventDefault();

    // Here, you would typically perform login validation
    // and handle the login process

    // For now, we'll just log the email and password
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the home page or perform any other necessary actions
      history.push('/training');
    } catch (error) {
      Modal.warning({
        title:"Login Failed",
        content:"Invalid username or password!"
      })
      console.error('Login failed:', error);
      // Handle login error
    }
    console.log('Email:', email);
    console.log('Password:', password);

    // You can also handle successful login and navigate to the home page    
  };

  return (
    <div className='login-container'>
         <div className='login-title'>
               <span style={{fontWeight:"bold",fontSize:"30px"}}>Login</span>
        </div>
      <div style={{ marginTop: '10px' }}>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>
      <div className='login-main-container'>
      <div className='login-main-container-holder'>
          <img
            src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png"
            alt="Audio Lines"
            height="100"
          />
        </div>
      <div className='login-main-container-form-holder'>
      <Form onFinish={handleLogin}>
        <Form.Item
        //   label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            className='login-email-handler'
          />
        </Form.Item>

        <Form.Item
        //   label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className='login-password-handler'
          />
        </Form.Item>

        <Form.Item>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} className='login-signed-in-checkbox'>
            Keep me signed in
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className='login-main-container-form-button'>
            Login
          </Button>
        </Form.Item>
      </Form>

      <span className='login-no-account'>Don't have an account? 
        {/* <a href="/signup">Sign Up</a> */}
        <Button type="primary" htmlType="button" style={{marginLeft:"15px",backgroundColor:'#00736E'}} onClick={handleSignUp}>
            Create an account
        </Button>
      </span>
      <span className='login-forgot-password'>Forgot Password?</span>
      <div className='login-footer'>
        <a href="/privacy" style={{color:'#00736E'}}>Privacy</a>
        <a href="/legal" style={{color:'#00736E'}}>Legal</a>
        <a href="/terms" style={{color:'#00736E'}}>Terms and Conditions</a>
      </div>
      </div>
      </div>
      </div>
  );
};

export default LoginPage;