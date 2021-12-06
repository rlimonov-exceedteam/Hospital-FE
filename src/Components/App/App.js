
import LoginPage from '../LoginPage/LoginPage'
import { Switch, Route, Redirect } from 'react-router-dom';

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
      <Redirect form='/' to='/registrationPage'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
