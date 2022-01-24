import React from 'react';
import './MyButton.scss';

interface Props {
  children : string
}

const MyButton: React.FC<Props> = ({children, ...props}) => {
  return (
    <button className="myBtn" {...props}>
      {children}
    </button>
  );
};

export default MyButton;