import React, {useState, useContext} from "react";
import { Button, Form, Dropdown, Label, Divider } from 'semantic-ui-react';
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth'


function Register(){
    const context = useContext(AuthContext);
    const genreOptions = [
        {
          key: 'Action',
          text: 'Action',
          value: 'Action',
        },
        {
          key: 'Adventure',
          text: 'Adventure',
          value: 'Adventure',
        },
        {
          key: 'Romance',
          text: 'Romance',
          value: 'Romance',
        },
        {
          key: 'Comedy',
          text: 'Comedy',
          value: 'Comedy',
        },
        {
          key: 'Animated',
          text: 'Animated',
          value: 'Animated',
        },
        {   
            key: 'Crime',
            text: 'Crime',
            value: 'Crime',
        },
        {
            key: 'Fantasy',
            text: 'Fantasy',
            value: 'Fantasy',
        
        },
        {
            key: 'Family',
            text: 'Family',
            value: 'Family',
        },
        {
            key: 'Horror',
            text: 'Horror',
            value: 'Horror',

        }, 
    ]
    let navigate = useNavigate();
    const [errors, setErrors] = useState ({})
    const [values, setValues] = useState({
        username: "",
        password: "",
        email: "",
        confirmPassword:"",
        preferredGenre1:"",
        preferredGenre2:"",
        preferredGenre3:""
    })
    const genres = []
    const genre = [{genre1:"", genre2:"", genre3:""}]

    const onChange = (event) =>{
        setValues({...values,[event.target.name]: event.target.value});
    }

    const onChange2 = (event, result) => {
        const { name, value } = result || event.target;
        setValues({ ...values, [name]: value });
    };
     
    const [addUser, { loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data: {register: userData}}){
            context.login(userData);
            navigate('/');
            window.location.reload();
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })
    const onSubmit = (event)=>{
        event.preventDefault();
        //send mutation
        addUser();
    };

    return(
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Passord..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Divider horizontal>
                    Select Favourite Genre (Optional)
                </Divider>
                <Form.Dropdown
                    placeholder='Choose Genre'
                    fluid
                    selection
                    options={genreOptions}
                    name="preferredGenre1"
                    onChange={onChange2}
                    value={values.preferredGenre1}
                    
                />
                <Divider horizontal>
                *
                </Divider>
                
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
                )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String! 
        $email: String!
        $password: String!
        $confirmPassword: String!
        $preferredGenre1: String
        $preferredGenre2: String
        $preferredGenre3: String    ) {
       register(
           registerInput:{
               username: $username
               email: $email
               password: $password
               confirmPassword: $confirmPassword
               preferredGenre1: $preferredGenre1
               preferredGenre2: $preferredGenre2
               preferredGenre3: $preferredGenre3
            }
       ){
           id email username createdAt token
       }
    }
`

export default Register;