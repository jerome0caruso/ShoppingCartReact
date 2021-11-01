import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import '../index.css';

const Register = () => {
    const [redirect, setRedirect] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Form Submitted!');

        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass) {
            setRedirect('/register');
        }

        let myHeaders =  new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let data = JSON.stringify({
            first_name: e.target.firstname.value,
            last_name: e.target.lastname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
        fetch('https://kekambas-bs.herokuapp.com/api/users', {
            method: 'POST',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            setRedirect('/kekambas');
          })
          .catch(err => console.log(err))
    }
    return (
        redirect ? <Redirect to={redirect} /> :
        <form className="form" onSubmit={handleSubmit}>
            <h3 className='text-center'> Register Here</h3>
            <div className='form-group'>
            <fieldset>
                    <label htmlFor='firstname'>FirstName</label>
                    <input type='text' name='firstname' className='form-control' placeholder='First Name' />
                </fieldset>
                <fieldset>
                    <label htmlFor='lastname'>LastName</label>
                    <input type='text' name='lastname' className='form-control' placeholder='LastName' />
                </fieldset>
                <fieldset>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' className='form-control' placeholder='Username' />
                </fieldset>
                <fieldset>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' className='form-control' placeholder='Email' />
                </fieldset>
                <fieldset>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Password' />
                </fieldset>
                <fieldset>
                    <label htmlFor='confirmPass'>Confirm Password</label>
                    <input type='password' name='confirmPass' className='form-control' placeholder='Confirm Password' />
                </fieldset>
                <input type='submit' className='btn btn-secondary' />
            </div>
        </form>
    )

}

export default Register;