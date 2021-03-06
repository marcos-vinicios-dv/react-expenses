import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomeApp from './pages/HomeApp';
import Login from './pages/Login';
import { userContext } from './contexts/userContext';
import { apiGetUsers } from './services/apiServices';

function App() {
  const [user, setUser] = useState<string | null>('');

  useEffect(() => {
    apiGetUsers().then(
      res => setUser(res.nome),
      e => {
        onSignOut();
      }
    );
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <userContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Switch>
            <Route path="/expenses/:date">
              <HomeApp />
            </Route>
            <Redirect to={{ pathname: '/expenses/2021-01' }} />
          </Switch>
        </Router>
      </userContext.Provider>
    );
  } else {
    return <Login onSignIn={setUser} />;
  }
}

export default App;
