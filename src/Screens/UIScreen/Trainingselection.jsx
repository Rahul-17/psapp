import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Layout, Typography, Row, Col, Image, Modal } from 'antd';
import './training.css'

const { Content, Header } = Layout;
const { Title, Text } = Typography;

const TrainingSelection = () => {
  const history = useHistory();

  const handlePresentationSkillsClick = () => {
    history.push('/set-timer-to-speak');
  };

  const handleInterviewSkillsClick = () => {
    Modal.info({
      title: 'Coming Soon',
      content: 'Working on this feature.',
      okText: 'OK',
    });
  };

  return (
  <div>
  <div className="training-header">
    <Image
      src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Supergraphic.jpg"
      preview={false}
      width="100%"
      height="10px"
    />
  </div>
  <Content className="training-content">
    <div className="training-centered-div">
      <Image
        src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/audio_lines.png"
        height={90}
        preview={false}
      />
    </div>

    <div className="training-white-background">
      <div className="training-inner-div">
        <Title level={3} className="training-title">
          Welcome to Public Speaking
        </Title>
        <Title level={5} className="training-subtitle">
          Select the Public Speaking Training that you want to undergo.
        </Title>
        <Row justify="center" className="training-row">
          <Col className="training-column">
            <Image
              src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Presentation-Skills-icon.png"
              preview={false}
              width={100}
              onClick={handlePresentationSkillsClick}
            />
            <Text className="training-text">Presentation Skills</Text>
          </Col>
          <Col className="training-column disabled">
            <Image
              src="https://publicspeakingapp.blob.core.windows.net/commonpsicons/Interview-Skills-icon.png"
              preview={false}
              width={100}
              onClick={handleInterviewSkillsClick}
            />
            <Text className="training-text">Interview Skills</Text>
          </Col>
        </Row>
      </div>
    </div>
  </Content>
</div>

  );
};

export default TrainingSelection;