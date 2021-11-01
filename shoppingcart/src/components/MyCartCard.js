

const MyCartCard = (props) => {
    const item = props.item
    return (
        <div className="card" style={{width: 18 + 'rem'}}>
            <div className="card-body">
                <img src="https://via.placeholder.com/350" className="card-img-top" alt="..."/>
                <h3 className="card-title">{item.name}</h3>
                <h4 className="card-text">{item.price}</h4>
                <h6 className="card-text">{item.description}</h6>
                <h6>Qty: {props.qty}</h6>
                <button href="/" className="btn btn-dark" onClick={() => props.handleDelete(item.id)}>Delete</button>
            </div>
        </div>
    )
}


export default MyCartCard;