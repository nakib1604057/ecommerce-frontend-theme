import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const CartHeader  = ({item, total, symbol, removeFromCart}) => (
            <li >
                <div className="media">
                    <Link to={`${process.env.PUBLIC_URL}/product/${item.slug}`}><img alt="" className="mr-3" src={`${item.img.file_name}`} /></Link>
                    <div className="media-body">
                        <Link to={`${process.env.PUBLIC_URL}/product/${item.slug}`}><h4>{item.name}</h4></Link>
                        <h4><span>{item.qty} x BDT {(item.price)}</span></h4>
                    </div>
                </div>
                {/*<span>{cart}</span>*/}
                <div className="close-circle">
                    <a href={null} onClick={ removeFromCart}><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
            </li>
        )



export default CartHeader;
