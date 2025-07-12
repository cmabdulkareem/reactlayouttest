import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Products() {

  const navigate = useNavigate()

  const [products, setProducts] = useState([
    {itemName: "Apple", itemDesc: "Kashmiri apple", itemPrice: 220, image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg"},
    {itemName: "Mango", itemDesc: "Kashmiri Mango", itemPrice: 150, image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg" },
    {itemName: "Orange", itemDesc: "Kashmiri Orange", itemPrice: 80, image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg"},
    {itemName: "Banana", itemDesc: "Kashmiri Banana", itemPrice: 100, image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg"}
  ])

  return (
    <div className="container">
      <div className="row">
        <h1>Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Item</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index)=> <tr key={index}>
              <th scope="row">{index+1}</th>
              <td><img src={product.image} alt="" width={50} height={50} /></td>
              <td>{product.itemName}</td>
              <td>{product.itemDesc}</td>
              <td>{product.itemPrice}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>console.log("you are editing item:"+index)}>Edit</button>
                <button className="ms-2 btn btn-danger" onClick={()=>console.log("you are deleting item:"+index)}>Delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
        <div className="row">
          <div className="col-3">
            <button className="btn btn-primary" onClick={()=>navigate("/admin/addProducts")}>Add New Item</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Products
