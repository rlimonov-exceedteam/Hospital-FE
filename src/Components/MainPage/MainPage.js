import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import MainPageInputs from '../MainPageInputs/MainPageInputs';
import MainTable from '../MainTable/MainTable';
import AlertBox from '../Alert/Alert';

const MainPage = () => {
  const [rows, setRows] = useState([]);
  const [alert, setAlert] = useState({
    opened: false, 
    text: ''
  });
  const { opened, text } = alert;

  useEffect(async () => {
    await axios.get('http://localhost:8000/getAllTableData').then(result => {
      setRows(result.data);
    }).catch(error => {
      setAlert({
        opened: true,
        text: error.message
      })
    });
  }, []);

  return (
    <>
      <Header 
        text="Приемы"
        hasButton={true}
      />
      <MainPageInputs
        setRows={setRows}
        rows={rows}
      />
      <MainTable 
        setRows={setRows}
        rows={rows}
      />
      <AlertBox
       text={text}
       opened={opened}
       setAlert={setAlert}
      />
    </>
  )
}

export default MainPage;