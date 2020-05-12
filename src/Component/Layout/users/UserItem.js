import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


const UserItem = ({user : {login,avatar_url,html_url}}) => {
    
       



    
        
        return (
            <div className='card text-center'>
             <h1 className='text-center'>{login}</h1>   
            <img src={avatar_url} className='round-img' style={{width:'60px'}}></img>
            <div>
            <Link className='btn btn-dark btn-sm my-1' to={`/user/${login}`}> Ughadun Bagh re!</Link>
            </div>

                
            </div>
        )
    
}

UserItem.propTypes={
    user: PropTypes.object.isRequired,

};

export default UserItem
