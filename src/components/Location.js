import React, { useState, useCallback } from 'react';
import { Button, NumericInput, FormGroup } from '@blueprintjs/core';
import { useLocation } from '../store';
import './Location.scss';

const Location = () => {
  const [location, setLocation] = useLocation();
  const [lng, setLng] = useState(location[0]);
  const [lat, setLat] = useState(location[1]);
  const handleSubmit = useCallback(() => setLocation([lng, lat]), [setLocation, lng, lat]);

  return (
    <div className="Location">
      <FormGroup label="Lat" inline className="form-group">
        <NumericInput value={lat} onValueChange={setLat} min={-90} max={+90} />
      </FormGroup>
      <FormGroup label="Lng" inline className="form-group">
        <NumericInput value={lng} onValueChange={setLng} min={-180} max={+180} />
      </FormGroup>
      <Button onClick={handleSubmit}>SUBMIT</Button>
    </div>
  );
};

export default Location;
