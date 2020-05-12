import React from 'react';
import UserItem from './UserItem';
import Spinner from '../../Layout/Spinner';
import PropTypes from 'prop-types';


const Users = ({users,loading}) => {
       if (loading){
            return <Spinner />
        
       }
     //   else if(users.length===0){
     //        return(
     //           <div>
     //                <h1>KAhi sapadla nahi re</h1>
     //           </div>

     //        )
     //   }

       else{
        return (
            <div style={UserStyle}>
            {users.map(papa =>(
            <UserItem key={papa.id} user={papa} />
    
    
            ))}
          </div>
            
    
    
            );
           


       }    
    
    
             
    
}

Users.propTypes={
     users :PropTypes.array.isRequired,
     loading :PropTypes.bool.isRequired
}


const UserStyle={
    display:'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap:'1rem',

}

export default Users
