import React,{Component, Fragment} from 'react';
import { BrowserRouter as Router,Switch ,Route} from 'react-router-dom';
import Navbar from './Component/Layout/Navbar';
import Users from './Component/Layout/users/Users'
import User from './Component/Layout/users/User'
import Search from './Component/Layout/users/Search'
import Alert from './Component/Layout/Alert'
import About from "./Component/Pages/About"
import Repos from "./Component/Repos/Repos"
import './App.css';
import { render } from '@testing-library/react';

require('dotenv').config({path :'../../.env' })


class App extends Component {
  state={
    users :[],
    user : {},
    repos:[],
    loading: false,
    alert:null
  }

  setAlert = (msg,type) =>{
    this.setState({alert:{msg,type}});
    setTimeout( ()=> this.setState({alert :null}),3000 );

  };


  searchUsers = (text) =>{
    this.setState({loading:true});
    console.log(text);
    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
     .then(res => res.json())
      .then(data => {this.setState({users :data.items, loading: false})});
     console.log(this.state.users);
     console.log(process.env.REACT_APP_GITHUB_ID);

  } ;

  getUser = (userName) =>{
    this.setState({loading:true});
    
    fetch(`https://api.github.com/users/${userName}`)
     .then(res => res.json())
      .then(data => {this.setState({user :data ,loading: false})});
     




  }
  getUserRepos = (userName) => {
    this.setState({loading:true});
    
    fetch(`https://api.github.com/users/${userName}/repos?per_page=5$sort=created:asc`)
     .then(res => res.json())
      .then(data => {this.setState({repos :data ,loading: false})});

  }


  // componentDidMount(){
    
  //   this.setState({loading:true});
  //   fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
  //    .then(res => res.json())
  //     .then(data => {this.setState({users :data, loading: false})})


  // }
        
    clearUsers = () => this.setState({users:[],loading:false});

  


  

  render()  {
      const {users,loading,alert,user,repos}=this.state;

    return (
      <Router>
        <div className="App">
          <Navbar  />
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render ={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showUsers={users.length>0 ?true:false} setAlert={this.setAlert}/>
                 <div className='container'>
                  <Users users={users} loading={loading} />
                  </div>

              </Fragment>


            )}  /> 
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render ={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading} repos={repos} getUserRepos={this.getUserRepos}/>
            )}/>
          </Switch>
          

        
        
      </div>
      </Router>
    );



  }
}



export default App;
