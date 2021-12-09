import { useState, useEffect } from 'react';
import MainPageInputs from '../MainPageInputs/MainPageInputs';
import MainTable from '../MainTable/MainTable';
import SortSection from '../SortSection/SortSection';
import AlertBox from '../Alert/Alert';
import Header from '../Header/Header';
import axios from 'axios';
import './MainPage.scss';

let isAsc = true;

const MainPage = () => {
  const [rows, setRows] = useState([]);
  const [initial, setInitial] = useState([]);
  const [sort, setSort] = useState({
    isSort: false, 
    sortBy: 'Без сортировки'
  });

  const [alert, setAlert] = useState({
    opened: false, 
    text: ''
  });
  const { opened, text } = alert;

  useEffect(async () => {
    await axios.get('http://localhost:8000/getAllTableData').then(result => {
      setRows(result.data.reverse());
      setInitial([...result.data]);
    }).catch(error => {
      setAlert({
        opened: true,
        text: error.message
      })
    });
  }, []);

  const handleAscending = (value) => {
    if (value === "По возрастанию") isAsc = true;
    else isAsc = false;
    
    handleSorting(sort.sortBy);
  }

  const handleSorting = (value) => {
    if (value === "По имени пациента") {
      setSort({
        sortBy: "По имени пациента",
        isSort: true
      });
      sortByPatient(isAsc);

    } else if (value === "Без сортировки") {
      setSort({
        sortBy: "Без сортировки",
        isSort: false
      });
      setRows([...initial]);

    } else if (value === "По имени доктора") {
      setSort({
        sortBy: "По имени доктора",
        isSort: true
      });
      sortByDoctor(isAsc);

    } else if (value === "По дате") {
      setSort({
        sortBy: "По дате",
        isSort: true
      });
      sortByDate(isAsc);
    }
  }

  const sortByPatient = (asc) => {
    if (asc) {
      const arr = rows.sort((p, n) => 
        p.patientName.toLowerCase() > n.patientName.toLowerCase() ? 1 : -1);
        setRows([...arr]);
    } else {
      const arr = rows.sort((p, n) => 
        p.patientName.toLowerCase() < n.patientName.toLowerCase() ? 1 : -1);
        setRows([...arr]);
    }
  }

  const sortByDoctor = (asc) => {
    if (asc) {
      const arr = rows.sort((p, n) => 
        p.doctorName > n.doctorName ? 1 : -1);
        setRows([...arr]);
    } else {
      const arr = rows.sort((p, n) => 
        p.doctorName < n.doctorName ? 1 : -1);
        setRows([...arr]);
    }
  }

  const sortByDate = (asc) => {
    if (asc) {
      const arr = rows.sort((p,n) => {
        const c = new Date(p.date);
        const d = new Date(n.date);

        return c - d;
      });
      setRows([...arr]);
    } else {
      const arr = rows.sort((p,n) => {
        const c = new Date(p.date);
        const d = new Date(n.date);

        return d - c;
      });
      setRows([...arr]);
    }
  }

  return (
    <>
      <Header 
        text="Приемы"
        hasButton={true}
      />
      <MainPageInputs
        setRows={setRows}
        isAsc={isAsc}
        sort={sort}
        rows={rows}
      />
      <div className="sorting">
        <SortSection 
          handleSorting={handleSorting}
        />
        {sort.isSort && 
          <div className="sort-wrapper">
            <label>
              Направление:
            </label>
            <select
              onChange={(e) => handleAscending(e.currentTarget.value)}
            >
              <option>По возрастанию</option>
              <option>По убыванию</option>
            </select>
          </div>
        }
      </div>
      <MainTable 
        setRows={setRows}
        isAsc={isAsc}
        sort={sort}
        rows={rows}
      />
      <AlertBox
       setAlert={setAlert}
       opened={opened}
       text={text}
      />
    </>
  )
}

export default MainPage;