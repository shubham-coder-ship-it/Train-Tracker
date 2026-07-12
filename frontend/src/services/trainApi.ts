import axios from "axios";

export const getTrainsBetweenStations =
  async (
    from: string,
    to: string
  ) => {
    const response =
      await axios.get(
        `http://localhost:5000/trains/${from}/${to}`
      );

    return response.data;
  };