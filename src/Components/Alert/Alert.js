import { 
  Snackbar,
  Alert,
  AlertTitle
} from '@mui/material';

const AlertBox = ({ opened, text, setAlert }) => {

  return (
    <Snackbar 
      open={opened} 
      autoHideDuration={6000} 
      anchorOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
      onClose={() => setAlert({opened: false, text: ''})}
    >
      <Alert  
        severity="error" 
        sx={{ width: '100%' }}
      >
        <AlertTitle>
          Ошибка
        </AlertTitle>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default AlertBox;