import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AddProducts() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDesc: '',
    itemPrice: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("/")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      data.append("itemName", formData.itemName)
      data.append("itemDesc", formData.itemDesc)
      data.append("itemPrice", formData.itemPrice)
      if (imageFile) {
        data.append("itemImage", imageFile)
      }

      const res = await axios.post('http://localhost:3000/addproduct', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      toast.success(res.data.message || "Product added successfully!")

      // Reset form after success
      setFormData({
        itemName: '',
        itemDesc: '',
        itemPrice: ''
      })
      setImageFile(null)
      setPreviewUrl("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product")
    }
  }

  const handleReset = () => {
    setFormData({
      itemName: '',
      itemDesc: '',
      itemPrice: ''
    })
    setImageFile(null)
    setPreviewUrl("/")
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <h1>Add Products</h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Item Name */}
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="itemDesc" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="itemDesc"
                name="itemDesc"
                value={formData.itemDesc}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label htmlFor="itemPrice" className="form-label">Item Price</label>
              <input
                type="number"
                className="form-control"
                id="itemPrice"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="itemImage" className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                id="itemImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setImageFile(file)
                    setPreviewUrl(URL.createObjectURL(file))
                  }
                }}
                required
              />
            </div>

            {/* Buttons */}
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button
                type="button"
                className="ms-3 btn btn-danger"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Image Preview */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={previewUrl} alt="Preview" width={400} style={{ borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
      </div>
    </div>
  )
}

export default AddProducts
