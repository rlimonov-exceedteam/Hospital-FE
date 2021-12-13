import { useState, useEffect } from "react";
import MainPageInputs from "../MainPageInputs/MainPageInputs";
import MainTable from "../MainTable/MainTable";
import AlertBox from "../Alert/Alert";
import Header from "../Header/Header";
import axios from "axios";
import "./MainPage.scss";

const MainPage = () => {
  const sortValues = [
    "Без сортировки",
    "По имени пациента",
    "По имени доктора",
    "По дате",
  ];

  const directionValues = ["По возрастанию", "По убыванию"];

  const [rows, setRows] = useState([]);
  const [initial, setInitial] = useState([]);
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

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/getAllTableData")
      .then((result) => {
        setRows(result.data);
        setInitial([...result.data]);
      })
      .catch((error) => {
        setAlert({
          opened: true,
          text: error.message,
        });
      });
  }, []);

  const sortFunction = (arr, key, asc) => {

    arr.sort((p, n) => (p[key].toLowerCase() > n[key].toLowerCase() ? 1 : -1));
    asc ? setRows([...arr]) : setRows([...arr.reverse()]);
  };

  const sortData = (isSort, by, asc, rows) => {
    setSort({
      ...sort,
      isSort,
    });

    const arr = rows;

    if (by !== "date") {
      sortFunction(arr, by, asc);
    } else {
      arr.sort((p, n) => {
        const c = new Date(p.date);
        const d = new Date(n.date);

        return c - d;
      });
      asc ? setRows([...arr]) : setRows([...arr.reverse()]);
    }
  };

  const sorting = (
    sortValues,
    sortBy,
    sort,
    isAsc,
    sortData,
    initial,
    rows
  ) => {
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
        break;

      case sortValues[2]:
        sortData(true, "doctorName", isAsc, rows);
        break;

      case sortValues[3]:
        sortData(true, "date", isAsc, rows);
        break;
    }
  };

  useEffect(() => {
    sorting(sortValues, sortBy, sort, isAsc, sortData, initial, rows);
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
      <Header text="Приемы" hasButton={true} />
      <MainPageInputs
        sortValues={sortValues}
        sortData={sortData}
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
            {sortValues.map((elem) => (
              <option>{elem}</option>
            ))}
          </select>
        </div>
        {sort.isSort && (
          <div className="sort-wrapper">
            <label>Направление:</label>
            <select onChange={(e) => handleAscending(e.currentTarget.value)}>
              {directionValues.map((elem) => (
                <option>{elem}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <MainTable
        setRows={setRows}
        sortData={sortData}
        sortValues={sortValues}
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
