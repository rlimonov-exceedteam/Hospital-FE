import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AlertBox from "../Components/Alert/Alert";
import axios from "axios";
import "./UpdateModal.scss";

const UpdateModal = ({
  modalOpened,
  toggleModal,
  setRows,
  isAsc,
  sort,
  rows,
  row,
}) => {
  const { patientName, doctorName, complaints, date, _id } = row;

  const { isSort, sortBy } = sort;

  const [alert, setAlert] = useState({
    opened: false,
    text: "",
  });
  const { opened, text } = alert;

  const [modalPatient, setModalPatient] = useState(patientName);
  const [modalDoctor, setModalDoctor] = useState(doctorName);
  const [modalDate, setModalDate] = useState(date);
  const [modalComplaints, setModalComplaints] = useState(complaints);

  const doctors = ["Штейн П.И.", "Осокина М.А.", "Путин В.В."];

  const update = async () => {
    await axios
      .patch("http://localhost:8000/updateTableData", {
        patientName: modalPatient,
        doctorName: modalDoctor,
        date: modalDate,
        complaints: modalComplaints,
        _id,
      })
      .then((result) => {
        const response = result.data;

        rows.forEach((item, index) => {
          if (item._id === response._id) {
            rows[index] = response;
          }
        });

        if (isSort) {
          if (sortBy === "По имени пациента") {
            if (isAsc) {
              const arr = rows.sort((p, n) =>
                p.patientName.toLowerCase() > n.patientName.toLowerCase() ? 1 : -1
              );
              setRows([...arr]);
            } else {
              const arr = rows.sort((p, n) =>
                p.patientName.toLowerCase() < n.patientName.toLowerCase() ? 1 : -1
              );
              console.log("arr", arr);
              setRows([...arr]);
            }
          } else if (sortBy === "По имени доктора") {
            if (isAsc) {
              const arr = rows.sort((p, n) =>
                p.doctorName > n.doctorName ? 1 : -1
              );
              setRows([...arr]);
            } else {
              const arr = rows.sort((p, n) =>
                p.doctorName < n.doctorName ? 1 : -1
              );
              setRows([...arr]);
            }
          } else if (sortBy === "По дате") {
            if (isAsc) {
              const arr = rows.sort((p, n) => {
                const c = new Date(p.date);
                const d = new Date(n.date);

                return c - d;
              });
              setRows([...arr]);
            } else {
              const arr = rows.sort((p, n) => {
                const c = new Date(p.date);
                const d = new Date(n.date);

                return d - c;
              });
              setRows([...arr]);
            }
          }
        } else {
          setRows([...rows]);
        }
        toggleModal();
      })
      .catch((error) => {
        setAlert({ opened: true, text: error.message });
        toggleModal();
      });
  };

  const undo = () => {
    setModalPatient(patientName);
    setModalDoctor(doctorName);
    setModalComplaints(complaints);
    setModalDate(date);
    toggleModal();
  };

  return (
    <Dialog open={modalOpened} onClose={() => toggleModal()}>
      <header>
        <p>Изменить прием</p>
      </header>
      <section>
        <div className="inputDiv">
          <label>Имя:</label>
          <input
            value={modalPatient}
            onChange={(e) => setModalPatient(e.currentTarget.value)}
          />
        </div>
        <div className="inputDiv">
          <label>Врач:</label>
          <select
            value={modalDoctor}
            onChange={(e) => setModalDoctor(e.currentTarget.value)}
          >
            {doctors.map((elem) => (
              <option>{elem}</option>
            ))}
          </select>
        </div>
        <div className="inputDiv">
          <label>Дата:</label>
          <input
            type="date"
            value={modalDate}
            onChange={(e) => setModalDate(e.currentTarget.value)}
          />
        </div>
        <div className="inputDiv">
          <label>Жалобы:</label>
          <textarea
            value={modalComplaints}
            onChange={(e) => setModalComplaints(e.currentTarget.value)}
          />
        </div>
      </section>
      <footer>
        <button className="close" onClick={() => undo()}>
          Отменить
        </button>
        <button className="save" onClick={() => update()}>
          Сохранить
        </button>
      </footer>
      <AlertBox text={text} opened={opened} setAlert={setAlert} />
    </Dialog>
  );
};

export default UpdateModal;
