import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MainPageInputs from '../MainPageInputs/MainPageInputs';
import MainTable from '../MainTable/MainTable';

const MainPage = ({ hasButton }) => {
  const [rows, setRows] = useState([]);

  return (
    <>
      <Header 
        text="Приемы"
        hasButton={hasButton}
      />
      <MainPageInputs 
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