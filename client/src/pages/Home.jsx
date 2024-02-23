import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Card,
  Input,
  Typography,
  Modal,
  message,
} from "antd";
import { LiaSearchSolid, LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API } from "../config/Axios";

const Home = () => {
  const [data, setData] = useState([]); // STATE
  const [load, setLoad] = useState(false); // STATE

  // ===> GET ALL DATAS FROM mongoDB DATABASE <===
  useEffect(() => {
    setLoad(true);
    API.get("/")
      .then(({ data }) => {
        setData(data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // ===> DELETE USER FROM DATABASE <===

  const deleteUser = (id, name) => {
    Modal.confirm({
      title: `Are you sure  to delete user: ${name} ?`,
      okText: "Yes",
      cancelText: "No",
      okButtonProps: { className: "bg-green-500 border-0 text-white" },
      cancelButtonProps: { className: "bg-red-500 border-0 text-white  " },
      onOk: () => {
        API.delete(`delete-user/${id}`)
          .then(() => {
            let deletedUser = data.filter((dt) => dt._id !== id);
            setData(deletedUser);
            message.success(`User: ${name} was deleted Successfly!`);
          })
          .catch((err) => console.log(err.message));
      },
      onCancel: () => {
        return message.success("The operation was canceled!", 2);
      },
    });
  };

  return (
    <section>
      <div className="table-area p-5">
        <Card>
          <Space className="flex justify-between p-2.5 mb-1.5 border rounded-xl ">
            <Typography.Title level={3} type="success">
              Current Users: {data.length}
            </Typography.Title>
            <Link to={"/create"}>
              <Button type="default">Add New User</Button>
            </Link>
          </Space>
          <Table
            columns={[
              {
                title: "Id",
                dataIndex: "_id",
              },
              {
                title: "Name",
                dataIndex: "name",
                filterDropdown: ({
                  setSelectedKeys,
                  selectedKeys,
                  confirm,
                }) => {
                  return (
                    <Input
                      placeholder="Search by Name..."
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                      }}
                      onPressEnter={() => {
                        confirm();
                      }}
                      onBlur={() => {
                        confirm();
                      }}
                    />
                  );
                },
                filterIcon: () => {
                  return <LiaSearchSolid size={18} />;
                },
                onFilter: (value, record) => {
                  return record.name
                    .toLowerCase()
                    .includes(value.toLowerCase());
                },
              },
              {
                title: "Lastname",
                dataIndex: "lastname",
                filterDropdown: ({
                  selectedKeys,
                  confirm,
                  setSelectedKeys,
                }) => {
                  return (
                    <Input
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                      }}
                      placeholder="Search by Lastname..."
                      onPressEnter={() => {
                        confirm();
                      }}
                      onBlur={() => {
                        confirm();
                      }}
                    />
                  );
                },
                filterIcon: () => {
                  return <LiaSearchSolid size={18} />;
                },
                onFilter: (value, record) => {
                  return record.lastname
                    .toLowerCase()
                    .includes(value.toLowerCase());
                },
              },
              {
                title: "Email",
                dataIndex: "email",
                filterDropdown: ({
                  selectedKeys,
                  confirm,
                  setSelectedKeys,
                }) => {
                  return (
                    <Input
                      placeholder="Search by Email..."
                      value={selectedKeys[0]}
                      onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({ closeDropdown: false });
                      }}
                      onPressEnter={() => {
                        confirm();
                      }}
                      onBlur={() => {
                        confirm();
                      }}
                    />
                  );
                },
                filterIcon: () => {
                  return <LiaSearchSolid size={18} />;
                },
                onFilter: (value, record) => {
                  return record.email
                    .toLowerCase()
                    .includes(value.toLowerCase());
                },
              },
              { title: "Password", dataIndex: "password" },
              {
                title: "Actions",
                render: (_, value) => (
                  <Space>
                    <Link to={`/update/${value._id}`}>
                      <Button type="default">
                        <LiaUserEditSolid fill="green" size={22} />
                      </Button>
                    </Link>
                    <Button
                      type="default"
                      onClick={() => deleteUser(value._id, value.name)}
                    >
                      <AiOutlineUsergroupDelete fill="red" size={22} />
                    </Button>
                  </Space>
                ),
              },
            ]}
            pagination={{ pageSize: 5 }}
            dataSource={data.map((dt) => ({ ...dt, key: dt._id }))}
            loading={load}
          ></Table>
        </Card>
      </div>
    </section>
  );
};

export default Home;
