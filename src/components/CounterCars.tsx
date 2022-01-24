import React from 'react';

interface CounterCarsProps {
  carsCount: number,
  page: number,
  nameCounter: string
}

const CounterCars: React.FC<CounterCarsProps> = ({carsCount, page, nameCounter}) => {
  return (
    <div>
      <h2 className="counter-car">{nameCounter} ({carsCount})</h2>
      <h3 className="page">Page #{page}</h3>
    </div>
  );
};

export default CounterCars;