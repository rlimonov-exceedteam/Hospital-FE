import { useState } from "react";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import UpdateModal from "../../Modals/UpdateModal";
import DeleteModal from "../../Modals/DeleteModal";
import "./MainTableRow.scss";

const MainTableRow = ({ 
  setWithoutFilter,
  withoutFilter,
  sortValues,
  sorting,
  initial,
  setRows, 
  sort, 
  rows, 
  row 
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { patientName, doctorName, complaints, date, _id } = row;

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  return (
    <tr className="bodyTable">
      <td>
        <p>{patientName}</p>
      </td>
      <td>
        <p>{doctorName}</p>
      </td>
      <td>
        <p>{date}</p>
      </td>
      <td className="complaints">
        <p>{complaints}</p>
      </td>
      <td className="icons">
        <BorderColorRoundedIcon onClick={() => toggleModal()} />
        <CancelRoundedIcon onClick={() => toggleDelete()} />
      </td>
      {modalOpened && (
        <UpdateModal
          style={{
            overflow: 'hidden'
          }}
          setWithoutFilter={setWithoutFilter}
          withoutFilter={withoutFilter}
          modalOpened={modalOpened}
          toggleModal={toggleModal}
          sortValues={sortValues}
          sorting={sorting}
          initial={initial}
          setRows={setRows}
          sort={sort}
          rows={rows}
          row={row}
        />
      )}
      {modalDelete && (
        <DeleteModal
          setWithoutFilter={setWithoutFilter}
          withoutFilter={withoutFilter}
          toggleDelete={toggleDelete}
          modalDelete={modalDelete}
          setRows={setRows}
          rows={rows}
          _id={_id}
        />
      )}
    </tr>
  );
};

export default MainTableRow;
