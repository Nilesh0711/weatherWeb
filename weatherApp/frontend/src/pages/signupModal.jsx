import { useState } from "react";
import { React } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
const SignupModal = (props) => {
  const api = axios.create({
    baseURL: "http://127.0.0.1:3000",
  });
  const [showModal, setshowModal] = useState(false);
  const handleChange = () => {
    setshowModal(!showModal);
  };
  const [signupData, setsignupData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleEvent = (e, name) => {
    setsignupData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const signUser = () => {
    if (
      signupData.email.length == 0 ||
      signupData.password.length == 0 ||
      signupData.username.length == 0 ||
      signupData.cpassword.length == 0
    ) {
      alert("Please fill all the details");
    } else {
      if (signupData.password != signupData.cpassword) {
        alert("Password and confirm password does not match");
      } else {
        const request = {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        };
        api.post("/create", request).then((data) => {
          if (data["data"]["status"] == 1) {
            alert(data["data"]["message"]);
          } else if (data["data"]["status"] == 2) {
            alert(data["data"]["message"]);
            props.user(true);
          } else {
            alert(data["data"]["message"]);
          }
        });
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => (input.value = ""));
        console.log(response);
      }
    }
  };
  return (
    <div className="singupModal">
      <Button variant="danger" onClick={handleChange}>
        Create Account
      </Button>
      <Modal show={showModal}>
        <Modal.Header>SignUp Modal</Modal.Header>
        <Modal.Body className="flex flex-col">
          <input
            type="text"
            placeholder="Enter your username"
            className="my-2 p-2"
            onChange={(e) => handleEvent(e, "username")}
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            className="my-2 p-2"
            onChange={(e) => handleEvent(e, "cpassword")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleChange}>
            Close
          </Button>
          <Button variant="success" onClick={signUser}>
            SignUp
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SignupModal;
