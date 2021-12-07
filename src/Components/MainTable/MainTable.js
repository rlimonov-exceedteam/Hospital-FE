import { useEffect } from 'react';
import MainTableRow from '../MainTableRow/MainTableRow';
import axios from 'axios';
import './MainTable.scss';

const MainTable = ({
  setRows,
  rows
}) => {
  const tableHeads = [
    "Имя",
    "Врач",
    "Дата",
    "Жалобы",
    "" 
  ]

  useEffect(async () => {
    await axios.get('http://localhost:8000/getAllTableData').then(result => {
      setRows(result.data);
    })
  }, []);

  return (
    <div className="tableWrapper">
      <table cellspacing="0" border="0" cellpadding="0">
        <tr className="tableHead">
          {tableHeads.map(elem => <th>{elem}</th>)}
        </tr>
        {rows.map((elem) => <MainTableRow
              name={elem.patientName}
              doctor={elem.doctorName}
              date={elem.date}
              complaints={elem.complaints}
            />
        )}
      </table>
    </div>
  )
}

export default MainTable;