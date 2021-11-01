
const UserCard = (props) => {
    const user = props.user
    return (
        <div className="card mx-1">
            <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.email}</p>
            </div>
        </div>
    )
}


export default UserCard;