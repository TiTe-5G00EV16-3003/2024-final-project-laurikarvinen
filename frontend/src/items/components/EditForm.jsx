import React, { useState } from 'react';

function EditItemForm({ item, onSave }) {
    const [formData, setFormData] = useState({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        owner: item.owner,
        image: item.image
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="owner">Owner</label>
                <input type="text" className="form-control" id="owner" name="owner" value={formData.owner} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}

export default EditItemForm;
