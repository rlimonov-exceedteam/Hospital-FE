import { useState } from "react";
import AlertBox from "../Alert/Alert";
import axios from "axios";
import "./MainPageInputs.scss";

const MainPageInputs = ({ 
  setWithoutFilter,
  setOpenedInputs,
  openedInputs,
  withoutFilter,
  sortValues,
  sortData,
  setRows,
  sorting,
  initial, 
  sort, 
  rows 
}) => {
  const doctors = [
    "Штейн П.И.", 
    "Осокина М.А.", 
    "Путин В.В."
  ];

  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState(doctors[0]);
  const [complaints, setComplaints] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState({
    opened: false,
    text: "",
  });

  const { 
    opened, 
    text 
  } = alert;

  const { 
    isSort, 
    sortBy, 
    isAsc 
  } = sort;

  const addRow = async () => {
    if (
      patientName && 
      doctorName && 
      complaints && 
      date
    ) {
      const login = JSON.parse(localStorage.getItem('login'))

      await axios
        .post("http://localhost:8000/addTableData", {
          login,
          patientName,
          doctorName,
          complaints,
          date,
        })
        .then((result) => {
          let array = [...rows];
          array.unshift(result.data);
          setRows([...array]);

          array = withoutFilter.unshift(result.data);
          setWithoutFilter([...withoutFilter]);

          isSort && sorting(
            sortValues,
            sortBy, 
            sort, 
            isAsc, 
            sortData, 
            initial, 
            array
          );

          setPatientName("");
          setDoctorName("Штейн П.И.");
          setComplaints("");
          setDate("");
        })
        .catch((error) => {
          setAlert({
            opened: true,
            text: error.message,
          });
        });
    } else {
      setAlert({
        opened: true,
        text: "Не все поля заполнены",
      });
    }

  };

  return (
    <div className="MainPageInputs" style={{display: openedInputs ? 'flex' : 'none'}}>
      <div className="wrapper">
        <div className="inputDiv">
          <p>Имя:</p>
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.currentTarget.value)}
          />
        </div>
        <div className="inputDiv">
          <p>Врач:</p>
          <select
            value={doctorName}
            onChange={(e) => setDoctorName(e.currentTarget.value)}
          >
            {doctors.map((elem, i) => (
              <option key={i}>{elem}</option>
            ))}
          </select>
        </div>
        <div className="inputDiv">
          <p>Дата:</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </div>
        <div className="inputDiv">
          <p>Жалобы:</p>
          <input
            value={complaints}
            onChange={(e) => setComplaints(e.currentTarget.value)}
          />
        </div>
        <div className="buttons">
            <button onClick={() => addRow()}>
              Добавить
            </button>
        </div>
        <div className="buttons" id="close">
            <button onClick={() => setOpenedInputs(false)}>
              Закрыть
            </button>
        </div>
      </div>
      <AlertBox text={text} opened={opened} setAlert={setAlert} />
    </div>
  );
};

export default MainPageInputs;
