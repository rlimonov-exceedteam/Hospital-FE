import { useState } from 'react';
import { 
  Snackbar,
  Alert,
  AlertTitle
} from '@mui/material';
import axios from 'axios';
import './MainPageInputs.scss';

const MainPageInputs = ({
  patientName,
  doctorName,
  complaints,
  date,
  setPatientName,
  setDoctorName,
  setComplaints,
  setDate,
  setRows,
  rows
}) => {
  const [alert, setAlert] = useState({opened: false, alertText: ''});
  const { opened, alertText } = alert;

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
        const data = result.data;
        setRows([data, ...rows]);
      }).catch(error => {
        setAlert({
          opened: true,
          alertText: error.message
        });
      })
    } else {
      setAlert({
        opened: true,
        alertText: 'Не все поля заполнены'
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
          <option>Петр Петрович</option>
          <option>Иван Иванович</option>
          <option>Врач Врачев</option>
          <option>Врач с ну очень длинным именем</option>
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
          <Snackbar 
            open={opened} 
            autoHideDuration={6000} 
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            onClose={() => setAlert({text: '', opened: false})}
          >
            <Alert  
              severity="error" 
              sx={{ width: '100%' }}
            >
              <AlertTitle>
                Ошибка
              </AlertTitle>
              {alertText}
            </Alert>
          </Snackbar>
   </div>
 )
}

export default MainPageInputs;