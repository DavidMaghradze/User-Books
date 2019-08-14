import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import UserList from './UserList';

const Users = (props) => {

    const { users } = props;

    return (
        <div className="users">
            <div className="container users__container">
                <header className="wizard__header">
                    <h1 className="wizard__header-title">List of Users with their favourite book</h1>
                </header>
                <div className="user-list">
                    { users.length!==0 ? users.map((user, id)=> 
                        <UserList key={id} user={user}/>    
                    ) : <h2 style={{color: '#fff'}}>Sorry, there are No Users yet...</h2> 
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        users: _.values(state.users)
    }
}

export default connect(mapStateToProps)(Users);