import { useState } from 'react';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import UpdateModal from '../../Modals/UpdateModal';
import './MainTableRow.scss';

const MainTableRow = ({ 
  setRows,
  rows,
  row
}) => {
  const [modalOpened, setModalOpened] = useState(false);

  const { 
    patientName,
    doctorName,
    complaints,
    date
  } = row;

  const toggleModal = () => {
    setModalOpened(!modalOpened);
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
      <td>
        <p>
          {complaints}
        </p>
      </td>
      <td className="icons">
        <BorderColorRoundedIcon 
          onClick={() => toggleModal()}
        />
        <CancelRoundedIcon 
        />
      </td>
      <UpdateModal 
        modalOpened={modalOpened}
        toggleModal={toggleModal}
        setRows={setRows}
        rows={rows}
        row={row}
      />
    </tr>
  )
}

export default MainTableRow;