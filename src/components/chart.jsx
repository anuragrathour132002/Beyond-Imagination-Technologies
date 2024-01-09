import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import employee from "../data.js";

function Chart() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [partime, setPartimeCount] = useState(0);
  const [fulltime, setFulltimeCount] = useState(0);
  const [dailywage, setDailywageCount] = useState(0);

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (employee.length > 0) {
      calculateStatistics();
    }
  }, [employee]);

  const calculateStatistics = () => {
    // Calculate counts
    let male = 0;
    let female = 0;
    let fulltime = 0;
    let partime = 0;
    let dailywage = 0;
    employee.forEach((employee) => {
      if (employee.gender === "Male") {
        male++;
      } else if (employee.gender === "Female") {
        female++;
      }
      if (employee.employe_type === "Full time") {
        fulltime++;
      } else if (employee.employe_type === "Part Time") {
        partime++;
      } else if (employee.employe_type === "Daily Wage") {
        dailywage++;
      }
    });

    // Set state variables
    setMaleCount(male);
    setFemaleCount(female);
    setTotalEmployees(employee.length);
    setDailywageCount(dailywage);
    setFulltimeCount(fulltime);
    setPartimeCount(partime);
  };
  const malePercentage = ((maleCount / totalEmployees) * 100).toFixed(2);
  const femalePercentage = ((femaleCount / totalEmployees) * 100).toFixed(2);
  const fulltimePercentage = ((fulltime / totalEmployees) * 100).toFixed(2);
  const parttimePercentage = ((partime / totalEmployees) * 100).toFixed(2);
  const dailywagePercentage = ((dailywage / totalEmployees) * 100).toFixed(2);
  const datas1 = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [malePercentage, femalePercentage],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const datas2 = {
    labels: ["Part Time", "FullTime", "Daily Wage"],
    datasets: [
      {
        data: [parttimePercentage, fulltimePercentage, dailywagePercentage],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFFFF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFFFF"],
      },
    ],
  };

  return (
    <div className="flex-1 h-full p-7 bg-gray-100">
      <h1 className="text-2xl font-semibold text-center">
        {" "}
        KEY PERFORMANCE INDEICATORS
      </h1>

      <div className="flex flex-col">
        {/* First Pie Chart */}
        <div className="flex justify-evenly place-content-center bg-gray-100 rounded-lg p-4 shadow-md bg-white rounded-md border border-gray-300 p-4 mt-4">
          <h1 className="flex flex-col items-center place-content-center">
            Gender
          </h1>
          <div
            className="w-1/2 place-content-center"
            style={{ maxWidth: "300px" }}
          >
            <Pie data={datas1} />
          </div>
          <div className="flex flex-col items-center place-content-center">
            <div>
              <h4>TOTAL USER: {totalEmployees}</h4>
              <p>MALE: {maleCount}</p>
              <p>FEMALE: {femaleCount}</p>
            </div>
          </div>
        </div>
        <hr />
        {/* Second Pie Chart */}
        <div className="flex justify-evenly place-content-center bg-gray-100 rounded-lg p-4 shadow-md bg-white rounded-md border border-gray-300 p-4 mt-4">
          <h1 className="flex flex-col items-center place-content-center">
            Employement Type
          </h1>
          <div
            className="w-1/2 place-content-center"
            style={{ maxWidth: "300px" }}
          >
            <Pie data={datas2} />
          </div>
          <div className="flex flex-col items-center place-content-center">
            <div>
              <h4>TOTAL USER: {totalEmployees}</h4>
              <p>Full Time: {fulltime}</p>
              <p>Part Time: {partime}</p>
              <p>Daily Wage: {dailywage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
