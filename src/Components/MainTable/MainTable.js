import MainTableRow from '../MainTableRow/MainTableRow';
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
  ];

  return (
    <div className="tableWrapper">
      <table cellspacing="0" border="0" cellpadding="0">
        <tr className="tableHead">
          {tableHeads.map(elem => <th>{elem}</th>)}
        </tr>
        {rows.map((elem) => <MainTableRow
            row={elem}
            setRows={setRows}
            rows={rows}
          />
        )}
      </table>
    </div>
  )
}

export default MainTable;