import { useState } from 'react';
import AlertBox from '../Alert/Alert';
import axios from 'axios';
import './MainPageInputs.scss';

const MainPageInputs = ({
  setRows,
  rows
}) => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('П.И. Штейн');
  const [complaints, setComplaints] = useState('');
  const [date, setDate] = useState('');
  const [alert, setAlert] = useState({opened: false, text: ''});
  const { opened, text } = alert;

  const doctors = [
    'П.И. Штейн',
    'М.А. Осокина',
    'В.В. Путин'
  ]

  const addRow = async () => {
    if (
      patientName && 
      doctorName &&
      complaints &&
      date
      ) {
      await axios.post('http://localhost:8000/addTableData', {
        patientName, 
        doctorName,
        complaints,
        date
      }).then(result => {
        setRows([...rows, result.data]);
      }).catch(error => {
        setAlert({
          opened: true,
          text: error.message
        });
      })
    } else {
      setAlert({
        opened: true,
        text: 'Не все поля заполнены'
      });
    }

    setPatientName('');
    setDoctorName('Петр Петрович');
    setComplaints('');
    setDate('');
  }

return (
  <div className="MainPageInputs">
    <div className="inputDiv">
      <p>
        Имя:
      </p>
      <input 
        value={patientName}
        onChange={(e) => setPatientName(e.currentTarget.value)}
      />
    </div>
    <div className="inputDiv">
      <p>
        Врач:
      </p>
      <select
        value={doctorName}
        onChange={(e) => setDoctorName(e.currentTarget.value)}
      >
        {doctors.map(elem => <option>{elem}</option>)}
      </select>
    </div>
    <div className="inputDiv">
      <p>
        Дата:
      </p>
      <input 
        type="date" 
        value={date}
        onChange={(e) => setDate(e.currentTarget.value)}
      />
    </div>
    <div className="inputDiv">
      <p>
        Жалобы:
      </p>
      <input 
        value={complaints}
        onChange={(e) => setComplaints(e.currentTarget.value)}
      />
    </div>
    <button onClick={() => addRow()}>
      Добавить
    </button>
    <AlertBox
      text={text}
      opened={opened}
      setAlert={setAlert}
    />
  </div>
  )
}

export default MainPageInputs;