import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const UserCard = (props) => {
    const [isEdit, setIsEdit] = useState(false);

    const changeEdit = () => {
        setIsEdit(true);
    }
    const handleEdit = (e) => {
        const username = e.target.u.value
        const email = e.target.e.value

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`);
        myHeaders.append("Content-Type", "application/json");
        let formData = {
            username: username,
            email: email
        }
        const body = JSON.stringify(formData);
        fetch(`https://kekambas-bs.herokuapp.com/api/users/${props.id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: body,
        }).then(res => res.json())
            .then(data => {
                setIsEdit(false);
            })
    }
    const history = useHistory();
    const handleDelete = () => {
        const myHeaders = new Headers()
        myHeaders.append('Authorization', `Bearer ${props.token}`)
        fetch(`https://kekambas-bs.herokuapp.com/api/users/${props.id}`, {
            method: 'DELETE',
            headers: myHeaders
        }).then(res => {
            const handleRoute = () =>{ 
                props.logout()
                history.push("/register");
                }
                handleRoute();

        }).catch(err => console.error(err))

    }
    return (
        <div>
           {isEdit ? 
           <form onSubmit={handleEdit}>
            <h6 className='text-center'>Edit User: {props.u}</h6>
            <div className='form-group'>
                <fieldset>
                    <label htmlFor='u'>Username</label>
                    <input type='text' className='form-control' name='u' defaultValue={props.u}/>
                </fieldset>
                <fieldset>
                    <label htmlFor='e'>Email</label>
                    <input type='text' className='form-control' name='e' defaultValue={props.e}/>
                </fieldset>
                <input type='submit' className='btn btn-dark' value='Update User'/>
            </div>
        </form>
           :  <table className="table table-success table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">Edit Account</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.id}</td>
                    <td>{props.fn}</td>
                    <td>{props.ln}</td>
                    <td>{props.u}</td>
                    <td>{props.e}</td>
                    <td><button onClick={changeEdit}className="btn btn-light">Edit</button><button onClick={handleDelete} className="btn btn-dark">Delete</button></td>
                </tr>
            </tbody>
            </table>}
        </div>
    )
}


export default UserCard;
