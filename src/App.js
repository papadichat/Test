import React from 'react';
import { BrowserRouter as Router,Switch ,Route} from 'react-router-dom';
import Navbar from './Component/Layout/Navbar';
import User from './Component/Layout/users/User';
import Home from './Component/Pages/Home';
import NotFound from './Component/Pages/NotFound';
import Alert from './Component/Layout/Alert';
import About from "./Component/Pages/About";
import './App.css';
import GithubState from "./Context/Github/GithubState";
import AlertState from "./Context/alert/AlertState";






const App = () => {
  
  
  return (
      <GithubState>
        <AlertState>
      <Router>
        <div className="App">
          <Navbar  />
          <Alert/>
          <Switch>
            <Route exact path='/' component={Home}/> 
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' component={User}/>
            <Route component={NotFound}/>
          </Switch>
          

        
        
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );



  
}



export default App;
