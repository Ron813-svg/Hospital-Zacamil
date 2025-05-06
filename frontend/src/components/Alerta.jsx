import React, { useState, useEffect } from 'react';

const Alerta = ({ mensaje }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer); 
  }, []);

  return visible ? (
    <div style={{ padding: '10px', backgroundColor: 'lightblue', textAlign: 'center', borderRadius: '5px' }}>
      {mensaje}
    </div>
  ) : null;
};

export default Alerta;