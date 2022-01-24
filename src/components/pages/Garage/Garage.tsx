import React, {useState, useEffect} from 'react';
import './Garage.scss';
import axios from "axios";
import Car, {CarProps} from "../../Car";
import { brandsCars } from '../../../cars/brands-cars';
import { modelsCars } from '../../../cars/models-cars';
import {getPageCount} from '../../../utils/pages';
import CarService from "../../../API/CarService";
import Pagination from "../../UI/pagination/Pagination";
import CounterCars from "../../CounterCars";

interface IChangeCar {
  name: string;
  color: string;
  id?: number;
}

interface IWinner {
  id: number;
  name: string;
  duration: number;
}

interface IWinCar {
  id: number;
  wins: number;
  time: number;
}

const Garage = () => {
  const [carsCount, setCarsCount] = useState<number>(0);
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({name: '', color: '#ffffff'});
  const [changeCar, setChangeCar] = useState<IChangeCar>({name: '', color: ''});
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(7);
  const [page, setPage] = useState(1);
  const [drive, setDrive] = useState(false);
  const [isWinner, setIsWinner] = useState<boolean>();
  const [winner, setWinner] = useState<IWinner>();
  const [winnerCar, setWinnerCar] = useState([]);

  const changePage = (page: number): void => {
    setPage(page)
  };

  const getWinnerCar = (bool: boolean, id: number, name: string, duration: number) => {
    setWinner({id: id, name: name, duration: +(duration/1000).toFixed(2)});
    setIsWinner(bool);
  };

  const addNewCar = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios.post('http://127.0.0.1:3000/garage', newCar);
    setNewCar({name: '', color: '#ffffff'});
    fetchCars();
  };

  const removeCar = (id: number): void => {
    axios.delete(`http://127.0.0.1:3000/garage/${id}`);
    fetchCars();
  };

  const editCar = (changeName: string, changeColor: string, idCar: number): void => {
    setChangeCar({name: changeName, color: changeColor, id: idCar});
  };

  const updateCar = (): void => {
    axios.put(`http://127.0.0.1:3000/garage/${changeCar.id}`, changeCar);
    setChangeCar({name: '', color: '#ffffff'})
    fetchCars();
  };

  const generateCars = (): void => {
    for (let i = 0; i < 100; i += 1) {
      const getCarBrand = getRandomInt(0, brandsCars.length - 1);
      const getCarModel = getRandomInt(0, modelsCars.length - 1);

      axios.post('http://127.0.0.1:3000/garage', ({name: `${brandsCars[getCarBrand]} ${modelsCars[getCarModel]}`, color: getRandomColor()}));
    }

    fetchCars();
  };

  const raceBtn = () => {
    setDrive(true);
    setIsWinner(true)
  };

  const resetBtn = () => {
    setDrive(false)
    setIsWinner(true)
  };

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function fetchCars(): Promise<void> {
    const response = await CarService.getAll(limit, page);
    const totalCount: number = +response.headers['x-total-count'];

    setCarsCount(totalCount);
    setCars(response.data);
    setTotalPages(getPageCount(totalCount, limit));
  }

  async function getWinCar() {
    const response = await axios.get(`http://127.0.0.1:3000/winners`);

    setWinnerCar(response.data);
  }

  useEffect(() => {
    fetchCars()
    getWinCar();
  }, [page]);

  useEffect(() => {
    if (isWinner === false) {
      alert(winner?.name);

      const getWinnerCar: any[] = winnerCar.filter((car: {id: number}) => car.id === winner!.id);

      if (getWinnerCar.length > 0) {
        if (getWinnerCar[0].time > winner!.duration) {
          axios.put(`http://127.0.0.1:3000/winners/${winner!.id}`, ({wins: getWinnerCar[0].wins + 1, time: winner!.duration}));
        } else {
          axios.put(`http://127.0.0.1:3000/winners/${winner!.id}`, ({wins: getWinnerCar[0].wins + 1, time: getWinnerCar[0].time}));
        }
      } else {
        axios.post('http://127.0.0.1:3000/winners', ({id: winner!.id, wins: 1, time: winner!.duration}));
      }
    }
  }, [isWinner]);

  return (
    <div>
      <div className="header">
        <div className="create">
          <input
            value={newCar.name}
            onChange={(e) => setNewCar({...newCar, name: e.target.value})}
            type="text"
          />
          <input
            onChange={(e) => setNewCar({...newCar, color: e.target.value})}
            type="color"
          />
          <button onClick={addNewCar}>CREATE</button>
        </div>

        <div className="update">
          <input
            value={changeCar.name}
            onChange={(e) => setChangeCar({...changeCar, name: e.target.value})}
            type="text"
          />
          <input
            onChange={(e) => setChangeCar({...changeCar, color: e.target.value})}
            type="color"
          />
          <button onClick={updateCar}>UPDATE</button>
        </div>

        <div className="race">
          <button onClick={raceBtn} disabled={drive}>RACE</button>
          <button onClick={resetBtn} disabled={!drive}>RESET</button>
          <button onClick={generateCars}>GENERATE CARS</button>
        </div>

        <div className="body">
          <CounterCars
            carsCount={carsCount}
            page={page}
            nameCounter={'Garage'}
          />

          {cars.map((item: CarProps) =>
            <Car
              key={item.id}
              id={item.id}
              name={item.name}
              color={item.color}
              removeCar={removeCar}
              editCar={editCar}
              drive={drive}
              getWinnerCar={getWinnerCar}
              isWinner={isWinner}
            />
          )}

          <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Garage;
