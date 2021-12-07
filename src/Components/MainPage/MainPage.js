import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MainPageInputs from '../MainPageInputs/MainPageInputs';
import MainTable from '../MainTable/MainTable';

const MainPage = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('Петр Петрович');
  const [complaints, setComplaints] = useState('');
  const [date, setDate] = useState('');
  const [rows, setRows] = useState([]);

  return (
    <>
      <Header 
        text="Приемы"
        hasButton={true}
      />
      <MainPageInputs 
        patientName={patientName}
        doctorName={doctorName}
        complaints={complaints}
        date={date}
        setPatientName={setPatientName}
        setDoctorName={setDoctorName}
        setComplaints={setComplaints}
        setDate={setDate}
        setRows={setRows}
        rows={rows}
      />
      <MainTable 
        setRows={setRows}
        rows={rows}
      />
    </>
  )
}

export default MainPage;