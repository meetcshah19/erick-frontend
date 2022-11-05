import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
 

  function validateForm() {
    return userName.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log({userName, password})

    if(userName === 'admin' && password === 'admin'){
        localStorage.setItem('loggedIn', 'true');
        window.location = '/'
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="userName">
          <Form.Label>Username </Form.Label>
          <Form.Control
            autoFocus
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}