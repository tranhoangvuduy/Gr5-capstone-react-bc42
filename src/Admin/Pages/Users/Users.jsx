import React, { useState, useEffect } from 'react'
import { notification, Space, Table, Modal } from 'antd';
import { apiGetUserList, apiDeleteUser } from '../../APIs/userAPI.js';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [userList, setUserList] = useState([]);
  const  [ searchValue, setSearchValue ] = useState('');
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Username',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      filteredValue: [searchValue],
      onFilter: (value, record) => String(record.taiKhoan).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Password',
      dataIndex: 'matKhau',
      key: 'matKhau',
    },
    {
      title: 'Name',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      key: 'soDT',
      dataIndex: 'soDT',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <button
            className="text-2xl text-blue-500"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-2xl text-red-500"
            onClick={() => deleteUser(record.taiKhoan)}
          >
            <DeleteOutlined />
          </button>
        </Space>
      )
    },
  ];

  const getUserData = async () => {
    try {
      const data = await apiGetUserList();
      setUserList(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  const deleteUser = async (taiKhoan) => {
    Modal.confirm({
      title: 'Are you sure to delete this user ?',
      content: 'This action cannot be undone',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await apiDeleteUser(taiKhoan);
          getUserData();
          notification.success({
            message: 'Delete user successfully',
          });
        }
        catch (error) {
          notification.error({
            message: 'Delete user failed',
          });
        }
      },
    });
  };

  const handleEdit = (record) => {
    const userId = record.taiKhoan;
    console.log(record.maPhim);
    navigate(`/admin/users/edit/${userId}`);
  };


  return (
    <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-full max-w-full px-3 mt-16">
          <div className="flex justify-between">
            <button
              className="mb-5 text-black font-bold py-2 px-4 rounded bg-white"
              style={{
                border: "none",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => navigate("/admin/users/add-user")}
            >
              Add new
            </button>
            <div className="search-wrapper rounded-lg flex align-items-center  w-3/12 mb-5">
              <form
                action
                className="relative ml-auto w-max bg-white rounded-3xl "
              >
                <input
                  type="search"
                  className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full 
            border bg-transparent pl-12 outline-none focus:w-full 
            focus:cursor-text focus:border-black focus:pl-16 focus:pr-4 inputSearch"
                  onSearch={(value) => {
                    setSearchValue(value);
                  }}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 my-auto h-8 w-12 border-r \
                  border-transparent px-3.5 peer-focus:border-gray-300 
                  peer-focus:stroke-black-500 stroke-black "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
          </div>
          <div
            className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                  border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
          >
            <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <span className=" text-slate-500 opacity-50 text-[18px]">
                Movie
              </span>
              <h3 className="ml-3 mb-2 font-bold">Catalog</h3>
            </div>

            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <Table columns={columns} dataSource={userList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Users