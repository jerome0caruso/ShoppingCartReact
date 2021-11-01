import React, { useState, useEffect } from 'react'
import Item from './components/Item';
import './index.css'

export const Home = (props) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        let mounted = true;
        fetch(`https://kekambas-bs.herokuapp.com/api/products`)
            .then(repsonse => repsonse.json())
            .then (data => {
                if(mounted) {
                    setProduct(data)
                }})
                return function cleanUp(){
                    mounted = false
                }
            },[])
    return (
        <div className="mainProducts">
             <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2020/TV/THBY_S2_02111_GWBleedingHero_1500x600_PRE_Final_en-US_PVD5224._CB410800060_.jpg" alt="" />
            <div className="d-flex w-50 flex-wrap">
                {product.map((item, key) => <Item item={item} key={key} handleMyCart={props.handleMyCart}/>)}
                
            </div>
        </div>

    )
}