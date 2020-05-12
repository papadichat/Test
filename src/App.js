import React,{useState, Fragment} from 'react';
import { BrowserRouter as Router,Switch ,Route} from 'react-router-dom';
import Navbar from './Component/Layout/Navbar';
import Users from './Component/Layout/users/Users'
import User from './Component/Layout/users/User'
import Search from './Component/Layout/users/Search'
import Alert from './Component/Layout/Alert'
import About from "./Component/Pages/About"

import './App.css';
import { render } from '@testing-library/react';





const App = () => {
  
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState({});
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [alert,setAlert]=useState(null);
  


   const showAlert = (msg,type) =>{
    setAlert({msg,type});
    setTimeout( ()=> setAlert(null),3000 );

  };


   const searchUsers = (text) =>{
    setLoading(true);
    console.log(text);
    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
     .then(res => res.json())
      .then(data => {
      setUsers(data.items);
      setLoading(true);});
     console.log(users);
     console.log(process.env.REACT_APP_GITHUB_ID);
     

  } ;

  const getUser = (userName) =>{
    setLoading(true);
    
    fetch(`https://api.github.com/users/${userName}`)
     .then(res => res.json())
      .then(data => {
      setUser(data);
      setLoading(false);});
     




  };
   const getUserRepos = (userName) => {
    setLoading(true);
    
    fetch(`https://api.github.com/users/${userName}/repos?per_page=5$sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
     .then(res => res.json())
      .then(data => {
      setRepos(data);
      setLoading(false);

      });

  };


  // componentDidMount(){
    
  //   this.setState({loading:true});
  //   fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
  //    .then(res => res.json())
  //     .then(data => {this.setState({users :data, loading: false})})


  // }
        
    const clearUsers = () => {
    setUsers([]);
    setLoading(false);};

  


  

 
    

    return (
      <Router>
        <div className="App">
          <Navbar  />
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render ={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showUsers={users.length>0 ?true:false} setAlert={showAlert}/>
                 <div className='container'>
                  <Users users={users} loading={loading} />
                  </div>

              </Fragment>


            )}  /> 
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render ={props => (
              <User {...props} getUser={getUser} user={user} loading={loading} repos={repos} getUserRepos={getUserRepos}/>
            )}/>
          </Switch>
          

        
        
      </div>
      </Router>
    );



  
}



export default App;
