import React from 'react'

function Card(props) {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={props.image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">
                    {props.description}
                </p>-
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Price : {props.price}</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">
                    Card link
                </a>
                <a href="#" className="card-link">
                    Another link
                </a>
            </div>
        </div>

    )
}

export default Card
