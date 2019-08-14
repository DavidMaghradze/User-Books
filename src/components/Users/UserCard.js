import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeUser } from '../../store/actions';

const UserCard = (props) => {

    const removeUser = (e) => {
        e.preventDefault();
        props.removeUser(props.user.email);
    }

    const renderGenres = (genres) => {
        return genres.map((genre,id)=>(
            <span key={id} className="genre">
                {genre}
            </span>
        ))
    }

    const { user } = props;

    return (
            <section className="user-card">
                <header className="user-card__header">
                    <h1 className="user-card__book-name">{user.name}</h1>
                    <div className="user-card__book-info">
                        <span>
                            <strong>Price:</strong>{user.price ? user.price : 'Not Specified' }
                        </span>
                        <span>
                            <strong>Parts:</strong>{user.parts ? user.parts : 'Not Specified'}
                        </span>
                    </div>
                </header>
                <section className="user-card__user">
                    <h2>Added by {user.firstName} {user.lastName}</h2>
                    <div className="user-card__user-info">
                        <div className="genres">
                            <strong>{user.firstName}'s Favourite genres:</strong> {user.genres && renderGenres(user.genres)}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div>
                            <strong>Age:</strong> {user.age}
                        </div>
                        <div>
                            <strong>User From:</strong> {user.country ? user.country : 'Not Specified'}
                        </div>
                        <div>
                            <strong>Gender:</strong> {user.gender ? user.gender : 'Not Specified'}
                        </div>
                    </div>
                </section>
                <footer>
                    <Link to={`/users/${user.email}/delete`} className="negative ui button">Remove</Link>
                    <Link to={`/users/${user.email}`} className="ui orange button">Edit</Link>
                </footer>
            </section>
    )
};

export default connect(null,{removeUser})(UserCard);