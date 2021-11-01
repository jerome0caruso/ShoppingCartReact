    const Item = (props) => {
        return (
            <div className="card" style={{width: 18 + 'rem'}}>
                <img src="https://via.placeholder.com/350" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>
                    <h5 className="card-title">{props.item.price}</h5>
                    <p className="card-text">{props.item.description}</p>
                    <p className="card-text">{props.item.id}</p>
                    <a href="/" className="btn btn-primary" onClick={(e) => props.handleMyCart(e, props.item.id)}>Add To Cart</a>
                </div>
            </div>
        )

    }

    export default Item;