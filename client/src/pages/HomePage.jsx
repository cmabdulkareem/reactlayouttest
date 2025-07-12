import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

function HomePage() {

  const [products, setProducts] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/findAllProducts")
      .then((response)=>{
        console.log(response.data)
        setProducts(response.data)
      })
      .catch((err)=>{console.error(err)})
  },[])


  return (
    <div className="container">
      <div className="row">
        <h1>This is home page</h1>
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <Card title={product.Title} price={product.Price} image={product.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
