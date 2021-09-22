import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import * as yup from "yup";
// import schema from './'
import axios from 'axios'


const signUpValue = {
    username: "",
    password: "",
}

const initialErrors = {
    username: "",
    password: "",
}



export default function Signup() {
    const [credentials, setCredentials] = useState(signUpValue);
    const [errors, setErrors] = useState(initialErrors);
    const { push } = useHistory()

    const changeHandler = (event) => {

        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    // const validate = (name, value) => {
    //     yup.reach(schema, name)
    //         .validate(value)
    //         .then(() => setErrors({ ...errors, [name]: "" }))
    //         .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    // }

    const signup = (event) => {
        event.preventDefault();
        axios.post("", credentials)
            .then(res => {
                console.log(res)
                push()
            })
            .catch(err => {
                setErrors('Please try again')
            })
    }



    return (
        <div className="signupPage">
            <div>
            <h1>Signup Today To Create A Potluck!</h1>
            </div>
            <div className='errors'>
                <div>{errors.username}</div>
                <div>{errors.password}</div>
            </div>

            <div className="signup-container">
                <form className='signup-form' onSubmit={signup}>
                    <label>Username:
                        <input
                            name="username"
                            placeholder="Username"
                            value={credentials.username}
                            type="text"
                            onChange={changeHandler}
                        />
                    </label>

                    <label>Password:
                        <input
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            type="password"
                            onChange={changeHandler}

                        />

                    </label>
                    <button >Signup</button>

                </form>
            </div>



        </div>
    )
}