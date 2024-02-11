import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validate from './validate';
import Swal from 'sweetalert2';
import Loading from './Loading';

const CreateProduct = () => {

    const navigate = useNavigate();

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

    useEffect(() => {
        setError(validate(input));
    }, [])

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
            return Swal.fire({
                title: 'Warning!',
                text: 'You Must Fill Out All Fields To Register A Product',
                icon: 'warning',
                confirmButtonColor: '#4C56A2',
            });
        }

        try {
            setLoading(true);

            await axios.post(process.env.REACT_APP_API_URL, input);

        } catch (error) {
            console.error(error);
        }

        finally {
            setLoading(false);
            navigate("/");
            return Swal.fire({
                title: 'Success!',
                text: 'Product Successfully Registered',
                icon: 'success',
                confirmButtonColor: '#4C56A2',
            });
        }
    }

    return (
        <div className="container my-5 ">
            {loading ?
                <Loading />
                : (
                    <div className="card col-md-8 mx-auto rounded-top-4">
                        <div className="card-header text-center text-white rounded-top-4">
                            <h4>Product Registration Form</h4>
                        </div>
                        <div className="form-container card-body">
                            <form onSubmit={handleOnSubmit}>
                                <div className="form-group mx-5 mb-3">
                                    <label htmlFor="name" className="form-label mb-2">Name </label>
                                    <input onChange={handleChange} value={input.name} type="text" className={`form-control ${error.name ? 'is-invalid' : 'is-valid'}`} name="name" placeholder="Enter Product Name" />
                                    {error.name && <div className="invalid-feedback">{error.name}</div>}
                                </div>

                                <div className="form-group mx-5 mb-3">
                                    <label for="price" className="form-label mb-2">Price</label>
                                    <input onChange={handleChange} value={input.price} type="text" className={`form-control ${error.price ? 'is-invalid' : 'is-valid'}`} name="price" placeholder="Enter Product Price" />
                                    {error.price && <div className="invalid-feedback">{error.price}</div>}
                                </div>

                                <div className="form-group mx-5 mb-3">
                                    <label for="quantity" className="form-label mb-2">Quantity</label>
                                    <input onChange={handleChange} value={input.quantity} type="text" className={`form-control ${error.quantity ? 'is-invalid' : 'is-valid'}`} name="quantity" placeholder="Enter Product Quantity" />
                                    {error.quantity && <div className="invalid-feedback">{error.quantity}</div>}
                                </div>

                                <div className="form-group mx-5 mb-3">
                                    <label for="code" className="form-label mb-2">Code</label>
                                    <input onChange={handleChange} value={input.code} type="text" className={`form-control ${error.code ? 'is-invalid' : 'is-valid'}`} name="code" placeholder="Enter Product Code" />
                                    {error.code && <div className="invalid-feedback">{error.code}</div>}
                                </div>

                                <div className="form-group mt-4 d-flex justify-content-center px-5">
                                    <button type="submit" className="btn btn-primary btn-form">Register</button>
                                    <Link to="/" className="btn btn-primary btn-form ms-5 ">Back</Link>
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

export default CreateProduct;
