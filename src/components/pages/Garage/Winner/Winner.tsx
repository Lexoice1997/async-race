import React, {useEffect} from 'react';

interface IWin {
  winner?: {name: string, duration: number}

}

const Winner: React.FC<IWin> = ({winner}) => {

  return (
    <h1>
      Winner is {winner?.name} {winner?.duration}
    </h1>
  );
};

export default Winner;
