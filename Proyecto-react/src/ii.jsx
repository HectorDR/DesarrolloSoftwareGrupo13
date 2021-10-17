import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router';
import ForbidenComponent from "forbiden/ForbidenComponent"

function HomePage() {
    const [productos, setProductos] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const [validUser, setValidUser] = useState(false);
    const getProdutos = async () => {
        try {
            const response = await fetch("http://localhost:3001/get-productos");
            const jsonResponse = await response.json();
            const responseProductos = jsonResponse.data;
            const listProductos = responseProductos.map((producto) =>
                <tr>
                    <th scope="row">{producto.id}</th>
                    <td>{producto.name}</td>
                    <td>{producto.price}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.description}</td>
                </tr>
            );
            setProductos(listProductos)
        }
        catch (error) {
            console.log(error)
        }

    }

    const validateUserRole = async () => {
        const response = await fetch(`http://localhost:3001/get-user?email=${user.email}`);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    const grantAccess = async () => {

        let userData;
        if (isAuthenticated) {
            userData = await validateUserRole();
        }
        else {
            
            loginWithRedirect();
             
            setValidUser(false);
            return;
        }

        if (userData) {
            if (userData.role !== "administrador") {
                setValidUser(true);
                localStorage.setItem("state", userData.role);
                await getProdutos();
            }
            else {
                localStorage.setItem("state", userData.role);
                setValidUser(false);
            }
        }
        else {
            setValidUser(false);
        }
        //console.log("Valid user: " + validUser)
    }
    useEffect(() => {
        grantAccess();
    }, [isAuthenticated, validUser]);

    return (
        <div className="container">
            {validUser ? <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {productos}
                </tbody>
            </table> : <ForbidenComponent/>}
        </div>
    )

}

export default HomePage