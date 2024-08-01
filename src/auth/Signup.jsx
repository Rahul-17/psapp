import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import fb from '../assets/facebook.png';
import gl from '../assets/google.png';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router';
import './signup.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); //added by Rahul
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); //added by Rahul
  const [isUpperCase, setIsUpperCase] = useState(false); //added by Rahul
  const [isLowerCase, setIsLowerCase] = useState(false); //added by Rahul
  const [isNumber, setIsNumber] = useState(false); //added by Rahul
  const [isSpecialChar, setIsSpecialChar] = useState(false); //added by Rahul
  const [isMinLength, setIsMinLength] = useState(false); //added by Rahul
  const [noTrailingSpace, setNoTrailingSpace] = useState(false); //added by Rahul
  const [isPasswordTyping, setIsPasswordTyping] = useState(false); //added by Rahul
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  //added by Rahul
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordTyping(true);
    //added by Rahul
    setIsUpperCase(/(?=.*[A-Z])/.test(value));
    setIsLowerCase(/(?=.*[a-z])/.test(value));
    setIsNumber(/(?=.*\d)/.test(value));
    setIsSpecialChar(/(?=.*[@$!%*?&])/.test(value));
    setIsMinLength(value.length >= 8);
    setNoTrailingSpace(!/\s$/.test(value));
  };
  //added by Rahul
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  //added by Rahul
  const validatePasswordFormat = () => {
    return (
      isUpperCase &&
      isLowerCase &&
      isNumber &&
      isSpecialChar &&
      isMinLength &&
      noTrailingSpace
    );
  };

  const handleSignUp = async () => {
    try {
      if (!validatePasswordFormat()) {
        Modal.warning({
          title: 'Password requirements not met',
          content: 'Password must meet all the criteria.',
        });
        return;
      }

      if (password !== confirmPassword) {
        Modal.warning({
          title: 'Password mismatch',
          content: 'Passwords do not match!',
        });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      Modal.info({
        title: 'Sign up successful!',
        content: 'Proceed to login.',
        onOk: () => {
          history.push('/login');
        },
      });

      console.log('Sign up successful!', user);
    } catch (error) {
      console.error('Sign up failed:', error);
      if (error.code === 'auth/email-already-in-use') {
        Modal.warning({
          title: 'Sign up failed.',
          content: 'Email already exists. Sign up with a different email.',
        });
      } else {
        Modal.error({
          title: 'Sign up failed.',
          content: `Error: ${error.message}`,
        });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-title">
        <span style={{ fontWeight: 'bold', fontSize: '30px' }}>Sign up</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>
      <div className="signup-main-container">
        <div className="signup-main-container-holder-lines">
          <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png" alt="Audio Lines" height="100" />
        </div>
        <div className="signup-main-container-holder">
          <Form onFinish={handleSignUp}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" value={username} onChange={handleUsernameChange} className="signup-username-handler" />
            </Form.Item>

            <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} className="signup-phone-handler" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email Address" value={email} onChange={handleEmailChange} className="signup-email-handler" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  validator: (_, value) =>
                    validatePasswordFormat(value)
                      ? Promise.resolve()
                      : Promise.reject('Password must meet all the criteria.'),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="signup-password-handler"
              />
            </Form.Item>

            {isPasswordTyping && (
              <div>
                <div>
                  {isUpperCase ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Contains an uppercase letter
                </div>
                <div>
                  {isLowerCase ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Contains a lowercase letter
                </div>
                <div>
                  {isNumber ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Contains a number
                </div>
                <div>
                  {isSpecialChar ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Contains a special character
                </div>
                <div>
                  {isMinLength ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Is at least 8 characters long
                </div>
                <div>
                  {noTrailingSpace ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
                  {' '}Does not end with a space
                </div>
              </div>
            )}

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="signup-confirm-password-handler"
              />
            </Form.Item>

            <Form.Item>
              <div className="signup-main-container-form-button">
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#00736E' }} className="signup-button">
                  Sign Up
                </Button>
              </div>
            </Form.Item>
          </Form>

          <div className="signup-other-options">Or sign up with</div>

          <Row justify="center" style={{ gap: '100px', marginTop: '10px' }}>
            <Col>
              <Button icon={<img src={fb} alt="Facebook" width="100" height="40" />} style={{ border: 'none' }} />
            </Col>
            <Col>
              <Button icon={<img src={gl} alt="Google" width="100" height="40" />} style={{ border: 'none' }} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;