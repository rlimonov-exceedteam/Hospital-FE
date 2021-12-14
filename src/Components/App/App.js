import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import './App.scss';

const App = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(!!token);

  return (
    <div className="App">
      <Switch>
        <Route path='/registrationPage'>
          <LoginPage 
            isRegistration={true}
            hasButton={false}
            setIsAuth={setIsAuth}
          />
        </Route>
        <Route path='/signInPage'>
          <LoginPage 
            isRegistration={false}
            hasButton={false}
            setIsAuth={setIsAuth}
          />
        </Route>
        {isAuth 
          ? <Route path='/mainPage'>
              <MainPage 
                hasButton={true}
                setIsAuth={setIsAuth}
              />
            </Route>
          : <Redirect path to="/signInPage"></Redirect>
        }
      <Redirect from='/' to='/signInPage'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
