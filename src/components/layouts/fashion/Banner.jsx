import React from 'react'
import {Link} from 'react-router-dom'
const main = () => {
    return (
        <div className="container">
        <div className="row partition2">
            <div className="col-md-6">
                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                    <div className="collection-banner p-right text-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner1.jpg`} className="img-fluid" alt=""/>
                            <div className="contain-banner">
                                <div>
                                    <h4>save 30%</h4>
                                    <h2>men</h2>
                                </div>
                            </div>
                    </div>
                </Link>
            </div>
            <div className="col-md-6">
                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                    <div className="collection-banner p-right text-center">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt=""/>
                            <div className="contain-banner">
                                <div>
                                    <h4>save 60%</h4>
                                    <h2>women</h2>
                                </div>
                            </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default main
