import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Container, Tab, Tabs, Alert } from 'react-bootstrap';

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [Data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false); 

  useEffect(() => {
    const savedData = localStorage.getItem('Data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Data', JSON.stringify(Data));
  }, [Data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); 
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        if (!Data.name) {
          setFormErrors({ ...formErrors, name: 'Name is required' });
          return false;
        }
        if (!Data.email) {
          setFormErrors({ ...formErrors, email: 'Email is required' });
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(Data.email)) {
          setFormErrors({ ...formErrors, email: 'Invalid email format' });
          return false;
        }
        if (!Data.phone) {
          setFormErrors({ ...formErrors, phone: 'Phone is required' });
          return false;
        }
        break;
      case 1:
        if (!Data.address1) {
          setFormErrors({ ...formErrors, address1: 'Address Line 1 is required' });
          return false;
        }
        if (!Data.city) {
          setFormErrors({ ...formErrors, city: 'City is required' });
          return false;
        }
        if (!Data.state) {
          setFormErrors({ ...formErrors, state: 'State is required' });
          return false;
        }
        if (!Data.zip) {
          setFormErrors({ ...formErrors, zip: 'Zip Code is required' });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      setShowErrorAlert(false); // Hide error alert if navigating to next step successfully
    } else {
      setShowErrorAlert(true); // Show error alert if validation fails
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setShowErrorAlert(false); // Hide error alert when navigating back
  };

  const handleSubmit = () => {
    localStorage.setItem('finalData', JSON.stringify(Data));
    alert('Form submitted successfully!');
    localStorage.removeItem('Data');
  };

  return (
    <Container>
      <Tabs activeKey={step} onSelect={() => {}} className="mb-3">
        <Tab eventKey={0} title="Step 1" disabled={step !== 0}>
          <Step1 data={Data} handleChange={handleChange} nextStep={nextStep} errors={formErrors} />
        </Tab>
        <Tab eventKey={1} title="Step 2" disabled={step !== 1}>
          <Step2 data={Data} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={formErrors} />
        </Tab>
        <Tab eventKey={2} title="Step 3" disabled={step !== 2}>
          <Step3 data={Data} prevStep={prevStep} handleSubmit={handleSubmit} />
        </Tab>
      </Tabs>
      {showErrorAlert}
    </Container>
  );
};

export default MultiStepForm;
