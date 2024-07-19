import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Button, Modal } from 'antd';
import './termsandconditions.css'


const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSecondBox, setIsCheckedSecondBox] = useState(false);
  const [isCheckedThirdBox, setIsCheckedThirdBox] = useState(false);
  const history = useHistory();

  const handleCheckboxChange = (setCheckboxState) => {
    return (event) => {
      setCheckboxState(event.target.checked);
    };
  };

  const handleProceedClick = () => {
    if (isChecked && isCheckedSecondBox && isCheckedThirdBox) {
      history.push('/login');
    } else {
      Modal.warning({
        title: 'Checklist',
        content: 'Please make sure that you have checked the required boxes before proceeding.',
      });
    }
  };

  return (
    <div className='terms-conditions-container'>
        <div className='terms-conditions-title'>
               <span >Terms & conditions</span>
        </div>
     
        <div style={{ marginTop: '10px' }}>
        <img src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg" alt="Colorful Banner" style={{ width: '100%', height: '10px' }} />
      </div>

    <div className='terms-conditions-main'>
    <div className='terms-conditions-main-text'>
        <div>
            <span> 
                1.Acceptance of Terms
                By using the app, users accept and agree to be bound by these Terms and Conditions after reading and understanding them.
            </span>
        </div>
        <div>
            <span> 
            2.User Consent
            Users explicitly consent to the recording of audio and video through the app and acknowledge their responsibility to obtain necessary consent from individuals appearing in the recorded content.
            </span>
        </div>
        <div>
            <span> 
            3.Ownership and Usage Rights
            Users retain ownership of the content they record using the app, while granting the app and its operators a non-exclusive, worldwide, royalty-free license to use, modify, distribute, and display the recorded content for operating and improving the app.
            </span>
        </div>
        <div>
            <span> 
           
        4.Privacy and Data Collection
        The app may collect personal information and data, including audio and video recordings, device information, and usage data. User data will be handled and protected in accordance with applicable privacy laws and the app's Privacy Policy.
            </span>
        </div>
        <div>
            <span> 
            5.Prohibited Use
        Users must not use the app for illegal, harmful, or unauthorized purposes, including infringing upon the rights of others such as copyright, privacy, and intellectual property rights.
            </span>
        </div>
        <div>
            <span>
        6.Limitations of Liability 
        The app and its operators are not liable for any damages, losses, or liabilities arising from the use or inability to use the app. The app does not guarantee the accuracy, completeness, or reliability of recorded content.</span>
        </div>
        <div>
    <span>7.Indemnification 
        Users agree to indemnify and hold the app and its operators harmless from any claims, damages, or losses arising from their use of the app or violation of these Terms and Conditions.</span>
  </div>
  <div>
    <span>8.Modification and Termination
         The app reserves the right to modify or terminate the app or these Terms and Conditions at any time without prior notice. Users are advised to periodically review the Terms and Conditions for any updates or changes.</span>
  </div>
  <div>
    <span>9.Governing Law and Jurisdiction 
        These Terms and Conditions are governed by the laws of the jurisdiction where the app is operated. Any disputes arising from app usage shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.</span>
  </div>
  <div>
    <span>10.Severability 
    If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain valid and enforceable to the fullest extent permitted by law. By using the app, users acknowledge that they have read, understood, and agreed to these Terms and Conditions. Failure to comply with these terms may result in the termination of user access to the app.
    </span>
  </div>
</div>
     
      <div className='terms-conditions-main-checklist'>
        <div style={{marginTop:"25px"}}>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange(setIsChecked)}
          >
            I accept the terms and conditions.
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={isCheckedSecondBox}
            onChange={handleCheckboxChange(setIsCheckedSecondBox)}
          >
            I accept the privacy statement.
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={isCheckedThirdBox}
            onChange={handleCheckboxChange(setIsCheckedThirdBox)}
          >
            I accept the legal conditions.
          </Checkbox>
        </div>
        <Button type="primary" onClick={handleProceedClick} style={{marginTop:"40px",backgroundColor:"#00736E"}}>
          Proceed
        </Button>
      </div>
    </div> 
    </div>
  );
};

export default TermsAndConditions;



