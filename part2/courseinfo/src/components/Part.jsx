// components/Part.jsx
import React from 'react';

const Part = ({ part }) => {
  return (
    <div>{part.name} {part.exercises}</div>
  );
}

export default Part;
