import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Input, message, Typography, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/Axios";

const CreateUser = () => {
  const navigate = useNavigate(); // NAVIGATE
  const inputRef = useRef(); // INPUTREF
  const [user, setUser] = useState({
    // STATE
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  // ===> AUTO-FOCUS WHEN THE PAGE LOAD <===
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // ===> HANDLE THE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // ===> ADD DATA TO mongoDB DATABASE <===
  const handleFinish = () => {
    let filledFields = Object.values(user).every((field) => {
      return field;
    });
    if (filledFields) {
      API.post("create-user", {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      })
        .then((res) => {
          message.success("Data was added to database Successfly !", 2);
          navigate("/");
        })

        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return message.error("All fileds must be filled !", 2);
    }
  };

  return (
    <section className="w-full flex justify-center h-full my-10 items-center">
      <div className="form-area border w-96 p-2.5 rounded-xl">
        <Typography.Title level={3} type="danger" className="text-center">
          Create User
        </Typography.Title>
        <Form
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              { required: true, message: "Please enter name!" },
              { whitespace: true },
              { min: 3, message: "Least 3 character required" },
            ]}
            hasFeedback
          >
            <Input
              name="name"
              placeholder="Type name..."
              value={user.name}
              onChange={handleChange}
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item
            label="lastname"
            name={"lastname"}
            rules={[
              { required: true, message: "Please enter lastname!" },
              { whitespace: true },
              { min: 3, message: "Least 3 character required" },
            ]}
            hasFeedback
          >
            <Input
              name="lastname"
              placeholder="Type lastname..."
              value={user.lastname}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="email"
            name={"email"}
            rules={[
              { type: "email", message: "Please enter valid email!" },
              { required: true, message: "Please enter email!" },
              { whitespace: true },
            ]}
            hasFeedback
          >
            <Input
              name="email"
              placeholder="Type email..."
              value={user.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="password"
            name={"password"}
            rules={[
              { required: true, message: "Please enter lastname!" },
              { whitespace: true },
              { min: 3, message: "Least 3 character required" },
            ]}
            hasFeedback
          >
            <Input.Password
              name="password"
              placeholder="Type password..."
              value={user.password}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="default" htmlType="submit" className="block w-full">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={"/"}>
              <Button type="default" htmlType="submit" className="block w-full">
                Back
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default CreateUser;
