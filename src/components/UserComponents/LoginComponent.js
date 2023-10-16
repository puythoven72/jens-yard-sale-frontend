import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import { useEffect, useState } from "react";
import AuthServices from "../services/AuthServices";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent() {

    const [loginForm, setLoginForm] = useState({});
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState();
    const navigate = useNavigate();

    const setField = (field, value) => {
        console.log(field + " IS THE FIELD");
        console.log(value + " IS THE VALUE");
        console.log(loginForm + " IS FORM");
        setLoginForm({
            ...loginForm,
            [field]: value,
        });
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            });
        }
    };


    function loginUser(e) {
        e.preventDefault();
        console.log(loginForm);
        setAuthError("");
        AuthServices.logInUser(loginForm)
            .then((res) => {
                console.log(res.data);
                AuthServices.setAuthToken(res.data.token);
                navigate("/admin");
            })
            .catch((err) => {

                if (err.response && err.response.status === 401) {
                    setAuthError("User name or password is incorrect.");
                }else{
                    setAuthError("Error Connecting to Server");
                }

                console.error(err);
            });
    }

    function closeErrorMsg(){
        setAuthError("");
    }

    return (
        <Container  style={{ backgroundColor: '#F4DFB6' }}>
            <h2 className="header">Login Form</h2>
            {authError ?
                <div className="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {authError}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={closeErrorMsg}></button>
                </div>
                :
                null
            }
            <Form>
                <Form.Group controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter User Name"
                        onChange={(e) => {
                            setField("userName", e.target.value);
                        }}
                        value={loginForm.userName}
                        defaultValue={""}
                        isInvalid={!!errors.userName}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.userName}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setField("password", e.target.value);
                        }}
                        value={loginForm.password}
                        defaultValue={""}
                        isInvalid={!!errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <input type="submit" value="Login" onClick={loginUser} />
            </Form>
            <a href="#" className="login-link">Don't have an account? Register here</a>



        </Container>

    )
}

export default LoginComponent;