import { useState } from "react";
import AlertBox from "../Alert/Alert";
import axios from "axios";
import "./MainPageInputs.scss";

const MainPageInputs = ({ setRows, isAsc, sort, rows }) => {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("Штейн П.И.");
  const [complaints, setComplaints] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState({
    opened: false,
    text: "",
  });
  const { opened, text } = alert;

  const { isSort, sortBy } = sort;

  const doctors = ["Штейн П.И.", "Осокина М.А.", "Путин В.В."];

  const addRow = async () => {
    if (patientName && doctorName && complaints && date) {
      await axios
        .post("http://localhost:8000/addTableData", {
          patientName,
          doctorName,
          complaints,
          date,
        })
        .then((result) => {
          let array = [...rows];
          array.unshift(result.data);

          if (isSort) {
            if (sortBy === "По имени пациента") {
              if (isAsc) {
                const arr = array.sort((p, n) =>
                  p.patientName.toLowerCase() > n.patientName.toLowerCase() ? 1 : -1
                );
                setRows([...arr]);
              } else {
                const arr = array.sort((p, n) =>
                  p.patientName.toLowerCase() < n.patientName.toLowerCase() ? 1 : -1
                );
                console.log("arr", arr);
                setRows([...arr]);
              }
            } else if (sortBy === "По имени доктора") {
              if (isAsc) {
                const arr = array.sort((p, n) =>
                  p.doctorName > n.doctorName ? 1 : -1
                );
                setRows([...arr]);
              } else {
                const arr = array.sort((p, n) =>
                  p.doctorName < n.doctorName ? 1 : -1
                );
                setRows([...arr]);
              }
            } else if (sortBy === "По дате") {
              if (isAsc) {
                const arr = array.sort((p, n) => {
                  const c = new Date(p.date);
                  const d = new Date(n.date);

                  return c - d;
                });
                setRows([...arr]);
              } else {
                const arr = array.sort((p, n) => {
                  const c = new Date(p.date);
                  const d = new Date(n.date);

                  return d - c;
                });
                setRows([...arr]);
              }
            }
          } else {
            setRows([...array]);
          }
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

    setPatientName("");
    setDoctorName("Штейн П.И.");
    setComplaints("");
    setDate("");
  };

  return (
    <div className="MainPageInputs">
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
          {doctors.map((elem) => (
            <option>{elem}</option>
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
      <button onClick={() => addRow()}>Добавить</button>
      <AlertBox text={text} opened={opened} setAlert={setAlert} />
    </div>
  );
};

export default MainPageInputs;
