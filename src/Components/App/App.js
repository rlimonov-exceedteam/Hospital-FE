import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/registrationPage'>
          <LoginPage 
            isRegistration={true}
            hasButton={false}
          />
        </Route>
        <Route path='/signInPage'>
          <LoginPage 
            isRegistration={false}
            hasButton={false}
          />
        </Route>
        <Route path='/mainPage'>
          <MainPage 
            hasButton={true}
          />
        </Route>
      <Redirect form='/' to='/signInPage'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
