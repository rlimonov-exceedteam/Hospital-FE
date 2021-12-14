import MainTableRow from '../MainTableRow/MainTableRow';
import './MainTable.scss';

const MainTable = ({
  setWithoutFilter,
  withoutFilter,
  sortValues,
  sortData,
  sorting,
  initial,
  setRows,
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
      <table cellSpacing="0" border="0" cellPadding="0">
        <thead>
          <tr className="tableHead">
            {tableHeads.map((elem, i) => <th key={i}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((elem, i) => <MainTableRow
              setWithoutFilter={setWithoutFilter}
              withoutFilter={withoutFilter}
              sortValues={sortValues}
              sortData={sortData}
              sorting={sorting}
              initial={initial}
              setRows={setRows}
              sort={sort}
              rows={rows}
              row={elem}
              key={i}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MainTable;