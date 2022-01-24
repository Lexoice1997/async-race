import axios from "axios";

export default class CarService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:3000/garage', {
      params: {
        _limit: limit,
        _page: page
      }
    });

    return response;
  }

  static async getAllWinners(limit = 10, page = 1) {
    const response = await axios.get('http://127.0.0.1:3000/winners', {
      params: {
        _limit: limit,
        _page: page
      }
    });

    return response;
  }
}
