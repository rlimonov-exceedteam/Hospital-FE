import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import './MainTableRow.scss';

const MainTableRow = ({ 
  name,
  doctor,
  complaints,
  date
}) => {
  return (
    <tr className="bodyTable">
      <td>
        {name}
      </td>
      <td>
        {doctor}
      </td>
      <td>
        {date}
      </td>
      <td>
        {complaints}
      </td>
      <td className="icons">
        <BorderColorRoundedIcon />
        <CancelRoundedIcon />
      </td>
    </tr>
  )
}

export default MainTableRow;