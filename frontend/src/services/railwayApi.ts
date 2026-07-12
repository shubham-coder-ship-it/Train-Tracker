import axios from "axios";

export const getPnrStatus =
async (pnr: string) => {

  const response =
    await axios.get(
      `http://localhost:5000/pnr/${pnr}`
    );

  return response.data;
};