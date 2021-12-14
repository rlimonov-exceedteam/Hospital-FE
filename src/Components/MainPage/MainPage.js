import { useState, useEffect } from "react";
import MainPageInputs from "../MainPageInputs/MainPageInputs";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import MainTable from "../MainTable/MainTable";
import AlertBox from "../Alert/Alert";
import Header from "../Header/Header";
import axios from "axios";
import "./MainPage.scss";

const MainPage = ({ setIsAuth }) => {
  const sortValues = [
    "Без сортировки",
    "По имени пациента",
    "По имени доктора",
    "По дате",
  ];

  const directionValues = ["По возрастанию", "По убыванию"];

  const [rows, setRows] = useState([]);
  const [initial, setInitial] = useState([]);
  const [withoutFilter, setWithoutFilter] = useState([]);
  const [filtration, setFiltration] = useState({
    isFilting: false,
    from: '', 
    to: ''
  });
  const { 
    isFilting,
    from,
    to
  } = filtration;

  const [sort, setSort] = useState({
    isSort: false,
    sortBy: sortValues[0],
    isAsc: true,
  });
  const { sortBy, isAsc } = sort;

  const [alert, setAlert] = useState({
    opened: false,
    text: "",
  });
  const { opened, text } = alert;

  const [openedInputs, setOpenedInputs] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    const getData = async () => {
      await axios
      .get(`http://localhost:8000/getAllTableData?login=${token}`)
      .then((result) => {
        setRows(result.data);
        setInitial([...result.data]);
        setWithoutFilter([...result.data]);
      })
      .catch((error) => {
        setAlert({
          opened: true,
          text: error.message,
        });
      });
    }
    
    getData();
  }, []);

  const sortFunction = (arr, key, asc) => {

    arr.sort((p, n) => (p[key].toLowerCase() > n[key].toLowerCase() ? 1 : -1));
    asc ? setRows([...arr]) : setRows([...arr.reverse()]);
    setWithoutFilter([...rows]);
  };

  const sorting = (
    sortValues,
    sortBy,
    sort,
    isAsc,
    initial,
    rows
  ) => {
    const sortData = (isSort, by, asc, mainArray) => {
      setSort({
        ...sort,
        isSort,
      });
  
      const arr = mainArray;
  
      if (by !== "date") {
        sortFunction(arr, by, asc);
      } else {
        arr.sort((p, n) => {
          const c = new Date(p.date);
          const d = new Date(n.date);
  
          return c - d;
        });
        asc ? setRows([...arr]) : setRows([...arr.reverse()]);
        setWithoutFilter([...mainArray]);
      }
    };

    switch (sortBy) {
      case sortValues[1]:
        sortData(true, "patientName", isAsc, rows);
        break;

      case sortValues[0]:
        setSort({
          ...sort,
          isSort: false,
        });
        setRows([...initial]);
        setWithoutFilter([...initial]);
        break;

      case sortValues[2]:
        sortData(true, "doctorName", isAsc, rows);
        break;

      case sortValues[3]:
        sortData(true, "date", isAsc, rows);
        break;

      default: {}
    }
  };

  const filterByDate = (initArray) => {
    let arr = [...initArray];
    if (from) {
      const point = new Date(from);
      arr = arr.filter(elem => new Date(elem.date) >= point);
    }
    
    if (to) {
      const point = new Date(to);
      arr = arr.filter(elem => new Date(elem.date) <= point);
    }

    setRows([...arr]);
  }

  useEffect(() => {
    isFilting && filterByDate(withoutFilter);
  }, [withoutFilter, isFilting]);

  const closeFilter = () => {
    setRows([...withoutFilter]);
    setFiltration({
      ...filtration,
      isFilting: false,
    });
  }

  useEffect(() => {
    sorting(sortValues, sortBy, sort, isAsc, initial, rows);
  }, [isAsc, initial, sortBy]);

  const handleAscending = (value) => {
    const flag = value !== directionValues[1];

    setSort({
      ...sort,
      isAsc: flag,
    });
  };

  return (
    <>
      <Header text="Приемы" hasButton={true} setIsAuth={setIsAuth} />
      <div className="create-data" style={{display: openedInputs ? 'none' : 'flex'}}>
        <button 
          onClick={() => setOpenedInputs(true)} 
        >
          Создать прием
        </button>
      </div>
      <MainPageInputs
        setWithoutFilter={setWithoutFilter}
        withoutFilter={withoutFilter}
        setOpenedInputs={setOpenedInputs}
        openedInputs={openedInputs}
        sortValues={sortValues}
        setRows={setRows}
        sorting={sorting}
        initial={initial}
        sort={sort}
        rows={rows}
      />
      <div className="sorting">
        <div className="sort-wrapper">
          <label>Сортировать:</label>
          <select
            onChange={(e) =>
              setSort({
                ...sort,
                sortBy: e.currentTarget.value,
              })
            }
          >
            {sortValues.map((elem, i) => (
              <option key={i}>{elem}</option>
            ))}
          </select>
        {sort.isSort && (
          <>
            <label>Направление:</label>
            <select onChange={(e) => handleAscending(e.currentTarget.value)}>
              {directionValues.map((elem, i) => (
                <option key={i}>{elem}</option>
              ))}
            </select>
          </>
        )}
        </div>
        <div className="filter-wrapper">
          {!isFilting &&
            <div className="add-filter">
              <p>
                Добавить фильтр по дате: 
              </p>
              <AddBoxIcon 
                fontSize="large" 
                onClick={() => setFiltration({
                  ...filtration,
                  isFilting: true
                })}
              />
            </div>
          }
          {isFilting && 
            <div className="filter">
              <div className="filter-input">
                <label>
                  От:
                </label>
                <input 
                  type="date" 
                  value={from}
                  onChange={(e) => setFiltration({
                    ...filtration,
                    from: e.currentTarget.value
                  })}
                />
              </div>
              <div className="filter-input">
                <label>
                  По:
                </label>
                <input 
                  type="date" 
                  value={to}
                  onChange={(e) => setFiltration({
                    ...filtration,
                    to: e.currentTarget.value
                  })}
                />
              </div>
              <div className='filter-buttons'>
                <button
                  onClick={() => filterByDate(withoutFilter)}
                >
                  Фильтровать
                </button>
                <CloseIcon 
                  fontSize="large" 
                  onClick={() => closeFilter()}
                />
              </div>
            </div>
          }
        </div>
      </div>
      <MainTable
        setWithoutFilter={setWithoutFilter}
        withoutFilter={withoutFilter}
        sortValues={sortValues}
        setRows={setRows}
        sorting={sorting}
        initial={initial}
        sort={sort}
        rows={rows}
      />
      <AlertBox setAlert={setAlert} opened={opened} text={text} />
    </>
  );
};

export default MainPage;