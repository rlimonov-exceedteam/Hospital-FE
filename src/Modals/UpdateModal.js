import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import AlertBox from "../Components/Alert/Alert";
import axios from "axios";
import "./UpdateModal.scss";

const UpdateModal = ({
  setWithoutFilter,
  withoutFilter,
  modalOpened,
  toggleModal,
  sortValues,
  setRows,
  sortData,
  sorting,
  initial,
  sort,
  rows,
  row
}) => {
  const { patientName, doctorName, complaints, date, _id } = row;

  const { 
    isSort, 
    sortBy,
    isAsc,
  } = sort;

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
        setRows([...rows]);
        
        withoutFilter.forEach((item, index) => {
          if (item._id === response._id) {
            withoutFilter[index] = response;
          }
        });
        setWithoutFilter([...withoutFilter]);

        isSort && sorting(
          sortValues,
          sortBy, 
          sort, 
          isAsc, 
          sortData, 
          initial, 
          rows
        );
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
