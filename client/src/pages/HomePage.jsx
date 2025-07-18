import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

function HomePage() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/findAllProducts")
      .then((response) => {
        console.log(response.data)
        setProducts(response.data)
      })
      .catch((err) => { console.error(err) })
  }, [])


  return (
    <div className="container">
      <div className="row">
        <h1>This is home page</h1>
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <Card
              title={product.itemName}
              description={product.itemDesc}
              price={product.itemPrice}
              image={`http://localhost:3000/images/products/${product._id}.jpg`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
