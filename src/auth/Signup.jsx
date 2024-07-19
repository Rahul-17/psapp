import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import fb from '../assets/facebook.png';
import gl from '../assets/google.png';
import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router';
import './signup.css'
import { Modal } from 'antd';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async (e) => {
    // e.preventDefault();
    // Here, you would typically perform sign-up validation
    // and handle the sign-up process

    // For now, we'll just log the username, email, and password
    try {
      // Sign up with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;

      // Update the user's display name (username)
      await updateProfile(user, { displayName: username });
      Modal.info({
        title:"Sign up successful!",
        content:"Proceed to login.",
        onOk: () => {
          history.push('/login');
        }
      })

      console.log('Sign up successful!', user);

      // After successful sign-up and redirecting to TrainingSelection component
       // Pass user object as prop

      // You can perform additional actions after successful sign-up, like redirecting to another page
    } catch (error) {
      console.error('Sign up failed:', error);
      Modal.warning({
        title:"Sign up failed.",
        content: "Email id already exists. Sign up with a different email."
      })
      // Handle sign-up error
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='signup-container'>
       <div className='signup-title'>
               <span style={{fontWeight:"bold",fontSize:"30px"}}>Sign up</span>
        </div>
        <div style={{ marginTop: '10px' }}>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>
      <div className='signup-main-container'>
      <div className='signup-main-container-holder-lines'>
          <img
            src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png"
            alt="Audio Lines"
            height="100"
          />
        </div>
      <div className='signup-main-container-holder'>
      <Form onFinish={handleSignUp}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className='signup-username-handler'
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            className='signup-email-handler'
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className='signup-password-handler'
            iconRender={(visible) =>
              visible ? <span onClick={togglePasswordVisibility}>Hide</span> : <span onClick={togglePasswordVisibility}>Show</span>
            }
          />
        </Form.Item>

        <Form.Item>
        <div className='signup-main-container-form-button
        '>
  <Button type="primary" htmlType="submit" style={{backgroundColor:'#00736E'}} className='signup-button'>
    Sign Up
  </Button>
</div>

        </Form.Item>
      </Form>

      <div className='signup-other-options'>Or sign up with</div>

      <Row justify="center" style={{gap:"100px",marginTop:"10px"}}>
        <Col>
          <Button icon={<img src={fb} alt="Facebook" width="100" height="40"/>}style={{border:"none"}}></Button>
        </Col>
        <Col>
          <Button icon={<img src={gl} alt="Google" width="100" height="40" />} style={{border:"none"}}></Button>
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
};

export default SignUpPage;