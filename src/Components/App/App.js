import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import './App.scss';

const App = () => {

  const [isAuth, setIsAuth] = useState(true);

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
          : <Redirect path to="/signInPage" />
        }
      <Redirect from='/' to='/signInPage' />
      </Switch>
    </div>
  );
}

export default App;
