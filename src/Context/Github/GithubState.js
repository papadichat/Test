import React,{useReducer} from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
SEARCH_USERS,
GET_USER,
CLEAR_USERS,
GET_REPOS,
SET_LOADING,


} from "../types";

const GithubState = (props) => {
    const initialState={
        users:[],
        user:{},
        repos:[],
        repo:{},
        loading:false
        
    }
    const [state,dispatch]=useReducer(GithubReducer,initialState);

    const searchUsers = (text) =>{
        setLoading();
        console.log(text);
        fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
         .then(res => res.json())
          .then(data => {
          dispatch({
              type:SEARCH_USERS,
              payload:data.items
          });
          });
         
         console.log(process.env.REACT_APP_GITHUB_ID);
         
    
      } ;

      const setLoading= () => dispatch({type:SET_LOADING});
      

      const clearUsers = () => {
        dispatch({
            type:CLEAR_USERS
        })};

      const getUser = (userName) =>{
            setLoading();
            
            fetch(`https://api.github.com/users/${userName}`)
             .then(res => res.json())
              .then(data => {
              dispatch({
                  type:GET_USER,
                  payload:data
              });
        });
        } ;
        
        const getUserRepos = (userName) => {
            setLoading();
            
            fetch(`https://api.github.com/users/${userName}/repos?per_page=5$sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_KEY}`)
             .then(res => res.json())
              .then(data => {
              dispatch({
                  type:GET_REPOS,
                  payload:data
              });
        
              });
        
          };
      














    return <GithubContext.Provider
    value={{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
        
    }}>

    
        {props.children}






    </GithubContext.Provider>

}
export default GithubState
