import React from 'react';
import { connect } from 'react-redux';

import history from '../../history';
import Modal from '../modal';
import { removeUser } from '../../store/actions';

const UserDelete = (props) => {

    const goToUsers = () => {
        history.push('/users');
    }

    const onRemoveClick = (id) => {
        props.removeUser(id);
        history.push('/users');
    }

    const renderContent = (user) => (
        <div style={{padding: "20px"}}>
            <h1>Are you sure you want to remove <strong>{user.firstName} {user.lastName}</strong> from list ?</h1>
            <div className="ui buttons" style={{marginTop: '20px'}}>
                <button onClick={()=>onRemoveClick(props.userToDelete.email)} className="ui negative button">Remove</button>
                <div className="or"></div>
                <button onClick={()=>goToUsers()} className="ui button discard" sty>Discard</button>
            </div>
        </div>
    )

    return (
        <Modal
            hideModal={goToUsers}
            class="opened"
        >
            { props.userToDelete ? renderContent(props.userToDelete) : history.push('/')}
        </Modal>
    )
};

const mapStateToProps = (state, OwnProps) => {
    return {
        userToDelete: state.users[OwnProps.match.params.id]
    }
}

export default connect(mapStateToProps, {removeUser})(UserDelete);