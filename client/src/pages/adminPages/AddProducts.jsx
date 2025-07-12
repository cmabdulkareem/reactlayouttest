import React, { useState } from 'react'

function AddProducts() {

    const [image, setImage] = useState("/")


    return (
        <div className="container">
            <div className="row">
                <h1>Add Products</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <form className="needs-validation" >
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
                                    required
                                />{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="row g-3">
                            <div className="col-sm-12">
                                <label htmlFor="itemImage" className="form-label">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="itemImage"
                                    placeholder="Upload file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        if (e.target.files[0]) {
                                            setImage(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }
                                    }
                                    required
                                />{" "}
                            </div>{" "}
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
