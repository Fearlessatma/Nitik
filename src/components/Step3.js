import React from 'react';
import { Button } from 'react-bootstrap';

const Step3 = ({ data, prevStep, handleSubmit }) => {
  const { name, email, phone, address1, address2, city, state, zip } = data;

  return (
    <div>
      <h3>Confirm your details</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Address Line 1:</strong> {address1}</p>
      <p><strong>Address Line 2:</strong> {address2}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Zip Code:</strong> {zip}</p>
      <Button variant="secondary" onClick={prevStep}>
        Back
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Step3;
