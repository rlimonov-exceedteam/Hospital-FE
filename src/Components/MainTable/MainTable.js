import { useEffect } from 'react';
import MainTableRow from '../MainTableRow/MainTableRow';
import axios from 'axios';
import './MainTable.scss';

const MainTable = ({
  setRows,
  rows
}) => {
  useEffect(async () => {
    await axios.get('http://localhost:8000/getAllTableData').then(result => {
      setRows(result.data);
    })
  }, []);

  return (
    <div className="tableWrapper">
      <table cellspacing="0" border="0" cellpadding="0">
        <tr className="tableHead">
          <th>
            Имя
          </th>
          <th>
            Врач
          </th>
          <th>
            Дата
          </th>
          <th>
            Жалобы
          </th>
          <td>
            
          </td>
        </tr>
        {rows.map((elem) => {
          console.log(elem)
          return (
            <MainTableRow
              name={elem.patientName}
              doctor={elem.doctorName}
              date={elem.date}
              complaints={elem.complaints}
            />
          )
        })}
      </table>
    </div>
  )
}

export default MainTable;