import React from "react";

const Input = ({ error, ...props }) => {
  return (
    <>
      <input {...props} />
      {error && <p style={{color : 'red', fontSize : 10}}>{error}</p>}
    </>
  );
};

export default Input;
