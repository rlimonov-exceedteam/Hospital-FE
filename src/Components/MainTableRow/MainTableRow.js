import { useState } from 'react';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import UpdateModal from '../../Modals/UpdateModal';
import DeleteModal from '../../Modals/DeleteModal';
import './MainTableRow.scss';

const MainTableRow = ({ 
  setRows,
  rows,
  row
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { 
    patientName,
    doctorName,
    complaints,
    date
  } = row;

  const toggleModal = () => {
    setModalOpened(!modalOpened);
  }

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  }

  return (
    <tr className="bodyTable">
      <td>
        <p>
          {patientName}
        </p>
      </td>
      <td>
        <p>
          {doctorName}
        </p>
      </td>
      <td>
        <p>
          {date}
        </p>
      </td>
      <td className="complaints">
        <p>
          {complaints}
        </p>
      </td>
      <td className="icons">
        <BorderColorRoundedIcon 
          onClick={() => toggleModal()}
        />
        <CancelRoundedIcon 
          onClick={() => toggleDelete()}
        />
      </td>
      <UpdateModal 
        modalOpened={modalOpened}
        toggleModal={toggleModal}
        setRows={setRows}
        rows={rows}
        row={row}
      />
      <DeleteModal 
        modalDelete={modalDelete}
        toggleDelete={toggleDelete}
        setRows={setRows}
        rows={rows}
        _id={row._id}
      />
    </tr>
  )
}

export default MainTableRow;