import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AlertBox from '../Components/Alert/Alert';
import axios from 'axios';
import './DeleteModal.scss';

const DeleteModal = ({ 
  setWithoutFilter,
  withoutFilter,
  modalDelete,
  toggleDelete,
  setRows,
  rows,
  _id
 }) => {
  const [alert, setAlert] = useState({
    opened: false, 
    text: ''
  });
  const { opened, text } = alert;

  const deleteData = async () => {
    const token = localStorage.getItem('token');

    await axios.delete(`http://localhost:8000/deleteTableData?_id=${_id}`, {
      headers: {
        token,
      }
    }).then(() => {
      rows = rows.filter(elem => elem._id !== _id);
      setRows([...rows]);

      withoutFilter = withoutFilter.filter(elem => elem._id !== _id);
      setWithoutFilter([...withoutFilter]);
      
      toggleDelete();
    }).catch(err => {
      setAlert({opened: true, text: err.message})
    });
  }

  return (
    <Dialog 
      open={modalDelete} 
      onClose={() => toggleDelete()}
    >
      <header className="delete-header">
        <p>
          Удалить прием
          </p>
      </header>
      <section className="delete-section">
        <p>
          Вы действительно хотите удалить прием?
        </p>
      </section>
      <footer className="delete-footer">
        <button 
          className="close"
          onClick={() => toggleDelete()}
        >
          Отменить
        </button>
        <button 
          className="delete"
          onClick={() => deleteData()}
        >
          Удалить
        </button>
      </footer>
      <AlertBox
        text={text}
        opened={opened}
        setAlert={setAlert}
      />
    </Dialog>
  )
}

export default DeleteModal;