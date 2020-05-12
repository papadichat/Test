import React,{useContext} from 'react'
import Repoitem from './Repoitem'
import GithubContext from "../../Context/Github/githubContext"


const Repos = () => {
    
    const githubContext=useContext(GithubContext);
    return (
       githubContext.repos.map(repo => <Repoitem repo={repo} key={repo.id} />)
    )
}



export default Repos
