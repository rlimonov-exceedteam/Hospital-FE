import { useState } from 'react';
import { 
  TextField, 
  Snackbar,
  Alert
} from '@mui/material';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './InputsField.scss';

const InputsField = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [alert, setAlert] = useState();
  const { opened, alertText } = alert;

  const history = useHistory();

  const validateAndPost = async () => {
    const regexLogin = /[A-Za-z0-9]{6,}/;
    const regexPassword = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$");

    if (login) {
      if (!regexLogin.test(login)) {
        setLogin('');
        setAlert({
          text: 'Логин должен содержать только латинские символы и цифры и быть не короче 6 символов.',
          opened: true
        });
        return;
      } 
    } else {
      setAlert({
        text: 'Введите логин.',
        opened: true
      });        
      return;
    }

    if (password) {
      if (!regexPassword.test(password)) {
        setPassword('');
        setAlert({
          text: `Пароль должен содержать только латинские символы и цифры. 
          Необходимо наличие минимум 1 заглавной, 1 маленькой буквы и 1 цифры. 
          Пароль должен содержать не менее 6 символов.`,
          opened: true
        });
        return;
      } 
    } else {
      setAlert({
        text :'Введите пароль',
        opened: true
      });
      return;
    }

    if (password !== repeatedPassword) {
      setAlert({
        text: 'Пароли не совпадают.',
        opened: true
      });
      return;
    } 

    await axios.post('http://localhost:8000/createNewUser', {
      login,
      password
    }).then(result => {
      if (result.statusText === 'OK') {
        setLogin(result.data.login);
        history.push('/mainPage')
      } else {
        setAlert({
          text: `Ошибка ${result.status}`,
          opened: true
        });
      }
    });
  }
    
  return (
    <div className="InputsField">
      <p>Зарегистрироваться</p>
      <form>
        <div className="input">
          <label>
            Логин:
          </label>
          <TextField 
            id="outlined-basic" 
            variant="outlined" 
            value={login}
            onChange={(e) => setLogin(e.currentTarget.value)}
          />
        </div>
        <div className="input">
          <label>
            Пароль:
          </label>
          <TextField 
            id="outlined-basic" 
            type="password" 
            variant="outlined" 
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="input">
          <label>
            Повторите пароль:
          </label>
          <TextField 
            id="outlined-basic" 
            type="password" 
            variant="outlined" 
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.currentTarget.value)}
          />
        </div>
      </form>
      <div className="btns">
        <button 
          className="btn"
          onClick={() => validateAndPost()}
        >
          Зарегистрироваться
        </button>
        <Link to="/signInPage">
          <p>
            Авторизоваться
          </p>
        </Link>
        <Snackbar 
            open={opened} 
            autoHideDuration={6000} 
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            onClose={() => setAlert({text: '', opened: false})}
        >
          <Alert  
            severity="error" 
            sx={{ width: '100%' }}
          >
            {alertText}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export default InputsField;