import MainTableRow from '../MainTableRow/MainTableRow';
import './MainTable.scss';

const MainTable = ({
  sortValues,
  sortData,
  sorting,
  initial,
  setRows,
  isAsc,
  sort,
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
            sortValues={sortValues}
            sortData={sortData}
            sorting={sorting}
            initial={initial}
            setRows={setRows}
            isAsc={isAsc}
            sort={sort}
            rows={rows}
            row={elem}
          />
        )}
      </table>
    </div>
  )
}

export default MainTable;