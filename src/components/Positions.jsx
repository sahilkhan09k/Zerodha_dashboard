import React from "react";
import { positions } from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "./PieChart";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchPositions = async () => {
      const positionscom = await axios.get(`${API_URL}/api/v1/users/positions`);
      console.log(positionscom.data.message);
      setPositions(positionscom.data.message);
    }

    fetchPositions();
  }, [])

  const labels = positions.map(position => position.name);
  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: positions.map(position => position.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positions.map((position, index) => {
            const curValue = position.price * position.qty;
            const isProfit = curValue - position.avg * position.qty > 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = position.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{position.product}</td>
                <td>{position.name}</td>
                <td>{position.qty}</td>
                <td>{position.avg.toFixed(2)}</td>
                <td>{position.price.toFixed(2)}</td>
                <td className={profClass}>{(curValue - position.avg * position.qty).toFixed(2)}</td>
                <td className={dayClass}>{position.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <PieChart data={data} />
    </>
  );
};

export default Positions;