import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import validate from './validate';

const EditProduct = () => {

    const navigate = useNavigate();

    const {id} = useParams();

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        name: "",
        price: "",
        quantity: "",
        code: ""
    });

    const [error, setError] = useState({
        name: "",
        price: "",
        quantity: "",
        code: ""
    });

    const getProductById = async () => {
        
        try {
            setLoading(true);

            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
            
            setInput(data);
    
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductById();
    }, [id])

    const handleChange = (event) => {
        event.preventDefault();

        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }));
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (!input.name || !input.price || !input.quantity || !input.code) {
            return alert("You Must Fill Out All Fields To Register A Product");
        }

        try {
            setLoading(true);
    
            await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, input);
            
        }catch(error){
            console.error(error);
        }
        
        finally {
            setLoading(false);
            navigate("/");
        }
    }

    return (
        <div className="container my-5">
            {loading ? 
                <div className="loading">
                    <div className="spinner"></div>
                </div> 
                : (
                <div className="card col-md-8 mx-auto rounded-top-4">
                    <div className="card-header rounded-top-4 text-center text-white" style={{ backgroundColor: "#282c34" }}>
                        <h4>Product Edit Form</h4>
                    </div>
                    <div className="form-container card-body">
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-group mx-5 mb-3">
                                <label htmlFor="name" className="control-label mb-2">Name</label>
                                <input onChange={handleChange} value={input.name} type="text" className="form-control" name="name" placeholder="Enter Product Name" />
                                {error.name && <p className="alert alert-danger small mt-2">{error.name}</p>}
                            </div>

                            <div className="form-group mx-5 mb-3">
                                <label for="price" className="control-label mb-2">Price</label>
                                <input onChange={handleChange} value={input.price} type="text" className="form-control" name="price" placeholder="Enter Product Price" />
                                {error.price && <p className="alert alert-danger small mt-2">{error.price}</p>}
                            </div>                    
                                                    
                            <div className="form-group mx-5 mb-3">
                                <label for="quantity" className="control-label mb-2">Quantity</label>
                                <input onChange={handleChange} value={input.quantity} type="text" className="form-control" name="quantity" placeholder="Enter Product Quantity" />
                                {error.quantity && <p className="alert alert-danger small mt-2">{error.quantity}</p>}
                            </div>    

                            <div className="form-group mx-5 mb-3">
                                <label for="code" className="control-label mb-2">Code</label>
                                <input onChange={handleChange} value={input.code} type="text" className="form-control" name="code" placeholder="Enter Product Code" />
                                {error.code && <p className="alert alert-danger small mt-2">{error.code}</p>}
                            </div>                                    

                            <div className="form-group mt-4 d-flex justify-content-around">
                                <button type="submit" className="btn btn-success">Edit</button>
                                <Link to="/" className="btn btn-primary">Back</Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-muted text-center">
                        <p>© 2024 Isaac Martinez</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProduct;
