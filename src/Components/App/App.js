import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/registrationPage'>
          <LoginPage isRegistration={true}/>
        </Route>
        <Route path='/signInPage'>
          <LoginPage isRegistration={false}/>
        </Route>
        <Route path='/mainPage'>
          <MainPage />
        </Route>
      <Redirect form='/' to='/signInPage'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
