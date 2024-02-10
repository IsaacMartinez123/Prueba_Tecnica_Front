import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState()

    const getAllProducts = async () => {

        try {
            setLoading(true);
            
            const {data} = await axios.get(process.env.REACT_APP_API_URL);
            
            setProducts(data);
            
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    const deleteproducts = async (id) => {
        
        try {
            setLoading(true);
    
            await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
    
            getAllProducts();
            
        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    
    return (
        <div className='m-5'>
            {loading ? 
            <div className="loading">
                <div className="spinner"></div>
            </div>
            :(
            <div>
                <h1 className='my-5 text-light text-center'>List Of Products</h1>
                
                <div className='d-flex justify-content-end mb-4'>
                    <Link to='/create' className='btn btn-success'>Create Products</Link>
                </div>
                <table className="table table-striped table-dark rounded-table text-center">
                    <thead>
                        <tr>
                            <th scope="col" className='fs-5'>Name</th>
                            <th scope="col" className='fs-5'>Price</th>
                            <th scope="col" className='fs-5'>Quantity</th>
                            <th scope="col" className='fs-5'>Code</th>
                            <th scope="col" className='fs-5'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products && products.map((product) => (
                        <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.code}</td>
                        <td>
                            <Link to={`edit/${product.id}`} className='btn btn-primary me-3 mb-1'>Edit</Link>
                            <button className='btn btn-danger ms-3 mb-1' onClick={ () => deleteproducts(product.id)}>
                                X
                            </button>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}

export default Index;
