import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const LoginModal = (props) => {
  const api = axios.create({
    baseURL: "http://127.0.0.1:3000",
  });
  const [showModal, setshowModal] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = () => {
    setshowModal(!showModal);
  };
  const handleEvent = (e, name) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const loginUser = async () => {
    if (loginData.email.length == 0 || loginData.password.length == 0) {
      alert("Please fill all the details");
    } else {
      try {
        const request = {
          email: loginData.email,
          password: loginData.password,
        };
        api.post("/login", request).then((data) => {
          console.log(data);
          if (data["data"]["_id"] != null) {
            props.user(true);
            alert(`Welcome ${data["data"]["username"]}`);
          } else {
            alert(`No such existing user`);
          }
        });
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => (input.value = ""));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="loginModal">
        <Button variant="success" onClick={handleChange}>
          Login In
        </Button>
        <Modal show={showModal}>
          <Modal.Header>Login Modal</Modal.Header>
          <Modal.Body className="flex flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="my-2 p-2"
              onChange={(e) => handleEvent(e, "email")}
            />
            <input
              type="password"
              placeholder="Enter your pasword"
              className="my-2 p-2"
              onChange={(e) => handleEvent(e, "password")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleChange}>Close</Button>
            <Button onClick={loginUser}>Login</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default LoginModal;
