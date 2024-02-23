import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Input, Spin, message, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../config/Axios";

const UpdateUser = () => {
  const navigate = useNavigate(); // NAVIGATE
  const { id } = useParams(); // PARAMS
  const inputRef = useRef(); // INPUTREF
  const [user, setUser] = useState({
    // STATES
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  // ===> INPUT AUTO-FOCUS WHEN THE PAGE LOAD <===
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // ===> HANDLE THE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // ===> UPDATE DATA TO mongoDB DATABASE <===
  const handleFinish = () => {
    API.put(`update-user/${id}`, {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    })
      .then((data) => {
        setUser(data.data);
       message.success("Was Updated Successfly!")
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ===> GET THE UPDATED USER <===
  useEffect(() => {
    API.get(`get-single-user/${id}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <section className="w-full flex justify-center h-full my-10 items-center">
      <div className="form-area border w-96 p-2.5 rounded-xl">
        <Typography.Title level={3} type="danger" className="text-center">
          Update User
        </Typography.Title>
        <Form
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item label="Name">
            <Input
              name="name"
              placeholder="Type name..."
              value={user.name}
              onChange={handleChange}
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item label="lastname">
            <Input
              name="lastname"
              placeholder="Type lastname..."
              value={user.lastname}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="email">
            <Input
              name="email"
              placeholder="Type email..."
              value={user.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="password">
            <Input.Password
              name="password"
              placeholder="Type password..."
              value={user.password}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="default" htmlType="submit" className="block w-full">
              Update
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

export default UpdateUser;
