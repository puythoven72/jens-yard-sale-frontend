import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../services/AuthServices"
import AuthServices from "../services/AuthServices";



function RegisterComponent() {
  const [regForm, setRegForm] = useState({});
  const [errors, setErrors] = useState({});
  const [regError, setRegError] = useState();
  const navigate = useNavigate();




  const validateForm = () => {
    const { fullName, userName, password, confirmPassword } = regForm;
    let newErrors = {};
    console.log(regForm);

    if (!fullName) {
      newErrors.fullName = "Please Enter Full Name.";
    }
    if (!userName) {
      newErrors.userName = "Please Enter User Name.";
    }

    if (!password) {
      newErrors.password = "Please Enter Password.";
    }

    if (!confirmPassword || confirmPassword != password) {
      newErrors.confirmPassword = "Passwords Must Match.";
    }
    return newErrors;
  };


  function registerUser(e) {
    e.preventDefault();
    console.log(regForm);
    const formErrors = validateForm();
    console.log(formErrors);
    if (Object.keys(formErrors).length > 0) {
      
      setErrors(formErrors);
    } else {
      AuthServices.registerUser(regForm)
        .then((res) => {
          console.log(res.data);
          navigate("/user/login");
        })
        .catch((err) => {

          if (err.response && err.response.status === 401) {
            setRegError("User name already exists.");
        }else{
          setRegError("Error Connecting to Server");
        }
          console.error(err);
        });
    }
  }

  const setField = (field, value) => {
   
    setRegForm({
      ...regForm,
      [field]: value,
    });
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  function closeErrorMsg(){
    setRegError("");
}




  return (

    <Container  style={{ backgroundColor: '#F4DFB6' }}>
      <h2 className="header">Registration Form</h2>
      {regError ?
                <div className="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {regError}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={closeErrorMsg}></button>
                </div>
                :
                null
            }

      <Form>

        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setField("fullName", e.target.value);
            }}
            value={regForm.fullName}
            defaultValue={""}
            isInvalid={!!errors.fullName}
          />

          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User Name"
            onChange={(e) => {
              setField("userName", e.target.value);
            }}
            value={regForm.userName}
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
            value={regForm.password}
            defaultValue={""}
            isInvalid={!!errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setField("confirmPassword", e.target.value);
            }}
            value={regForm.confirmPassword}
            defaultValue={""}
            isInvalid={!!errors.confirmPassword}
          />

          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <input type="submit" value="Register" onClick={registerUser} />

      </Form>
     
      <Link to={`/user/login`} className="login-link">Already have an account? Login here</Link>

    </Container>


  )


}
export default RegisterComponent;