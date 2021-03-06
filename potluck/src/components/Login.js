import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { loginStatus } from '../actions';
import Form from './Form';
import UserSchema from '../validations/UserSchema';

const initialState = {
    username: "",
    password: "",
};

const Login = (props) => {
    const { push } = useHistory();


    const handleLogin = formState => {
        axiosWithAuth()
            .post('/api/users/login', formState)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', formState.username);
                props.loginStatus(true);
                push('/')
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className='login'>
            <h1 style={{textAlign: 'center', marginTop: '30px', color: 'rgba(163, 22, 11, 1)'}}>LOG IN</h1>
            <Form
                initialState={initialState}
                submit={handleLogin}
                schema={UserSchema}
            />
        </div>

    )
}
export default connect(null, { loginStatus })(Login);