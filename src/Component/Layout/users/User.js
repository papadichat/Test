import React, { useEffect ,Fragment} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Spinner'
import {Link} from "react-router-dom"
import Repos from "../../Repos/Repos"

const User = ({loading,repos,user,getUser,getUserRepos,match}) => {
    useEffect(()=> {
        getUser(match.params.login);
        getUserRepos(match.params.login);

    },[]);
    
  



    
        
        
        const {public_repos,public_gists,login,name,url,id,avatar_url,html_url,followers_url,following_url,location,hireable,bio,followers,following}=user;
        if (loading) return <Spinner/>
        return (
           
            <Fragment>
             <Link to="/" className="btn btn-light">Back</Link>
                Hireable :{" "}
                {hireable ? (<i className="fas fa-check text-success"/> ): (<i className=" fas fa-times-circle text-danger"/>)}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{width:"150px"}} />
                        <h1> Name : {login}</h1>
                        <p1> Location: {location}</p1>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3> Bio</h3>
                            <p> {bio} </p>
                            </Fragment>}
                        <a href={html_url} className="btn btn-light"> My github Profile </a>    
                    </div>
                </div>
                <div className="card text-center">
                        <div className="badge badge-primary">Followers: {followers}</div>
                        <div className="badge badge-primary">Following: {following}</div>
                        <div className="badge badge-primary">Public_repos: {public_repos}</div>
                        <div className="badge badge-primary">Public_gists: {public_gists}</div>
                </div>
                <div>
                    
                </div>
                <Repos repos={repos} />

            </Fragment>
        )
    
}
User.propTypes={
    loading:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired
};

export default User
