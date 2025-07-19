import axios from 'axios'
import { handle } from 'express/lib/application'
import React, { useState } from 'react'

function AddProducts() {

    const [image, setImage] = useState("/")

    const [formData, setFormData] = useState({})
    function handleChange(e){
        const {name, value} = e.target
        // this will extract the name and value of the input from the event happeningfield
        setFormData((prevValue) => ({
            ...prevValue,
            [name]: value
            // {   , name: value}   // initially
            // {itemName: 'apple', name: value}
        }))
    }



    function handleSubmit(e){
        e.preventDefault()

        try {
            const data = new FormData()
            data.append('itemName', formData.itemName)
            data.append('itemDesc', formData.itemDesc)
            data.append('itemPrice', formData.itemPrice)
            if(image){
                data.append('image', image)
            }
            axios.post('http://localhost:3000/addProduct', data, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        // here we are saying that the form contains a file
                    }, 
                    withCredentials: true
                    // this is to send the cookie along with the post request
                }
            )
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }
    


    return (
        <div className="container">
            <div className="row">
                <h1>Add Products</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-sm-12">
                                <label htmlFor="itemName" className="form-label">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemName"
                                    placeholder="Enter Item Name"
                                    name='itemName'
                                    onChange={handleChange}
                                    value={formData.itemName}
                                    required
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="row g-5">
                            <div className="col-sm-12">
                                <label htmlFor="itemName" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemName"
                                    placeholder="Enter Item Description"
                                    required
                                    name='itemDesc'
                                    onChange={handleChange}
                                    value={formData.itemDesc}
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="row g-5">
                            <div className="col-sm-12">
                                <label htmlFor="itemPrice" className="form-label">
                                    Item Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="itemPrice"
                                    placeholder="Enter Item Price"
                                    onChange={handleChange}
                                    value={formData.itemPrice}
                                    name='itemPrice'
                                    required
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="row g-3">
                            <div className="col-sm-12">
                                <label htmlFor="itemImage" className="form-label">
                                    Upload Image
                                </label>
                                <input type="file" className="form-control" id="itemImage" placeholder="Upload file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        if (e.target.files[0]) {
                                            setImage(URL.createObjectURL(e.target.files[0])) // this is to display uploaded image by creating a URL
                                        }
                                    }
                                    }
                                    required
                                />
                            </div>
                        </div>{" "}
                        <div className="row mt-4">
                            <div className="col-6">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button className='ms-4 btn btn-danger' type="reset">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-6">
                    <img src={image} alt="" width={400} />
                </div>


            </div>
        </div>
    )
}

export default AddProducts
