import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './InputsField.scss';

const InputsField = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const history = useHistory();

  const validateAndPost = async () => {
    const regexLogin = /[A-Za-z0-9]/;
    const regexPassword = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$");

    if (login) {
      if (!regexLogin.test(login)) {
        setLogin('');
        alert('Логин должен содержать только латинские символы и цифры.');
        return;
      } 
    } else {
      alert('Введите логин.')
      return;
    }

    if (password) {
      if (!regexPassword.test(password)) {
        setPassword('');
        alert(`Пароль должен содержать только латинские символы и цифры. 
        Необходимо наличие минимум 1 заглавной, 1 маленькой буквы и 1 цифры. 
        Пароль должен содержать не менее 6 символов.'`);
        return;
      } 
    } else {
      alert('Введите пароль');
      return;
    }

    if (password !== password2) {
      alert('Пароли не совпадают.');
      return;
    } 

    await axios.post('http://localhost:8000/createNewUser', {
      login,
      password
    }).then(result => {
      if (result.statusText === 'OK') {
        setLogin(result.data.login);
        setPassword(result.data.password);
        history.push('/mainPage')
      } else {
        alert(`Ошибка ${result.status}`)
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
            value={password2}
            onChange={(e) => setPassword2(e.currentTarget.value)}
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
        <p>
          Авторизоваться
        </p>
      </div>
    </div>
  )
}

export default InputsField;