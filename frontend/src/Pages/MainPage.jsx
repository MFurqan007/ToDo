import React from 'react'
import LoginBg from '../assets/LoginBg.svg';
import Card from '../components/Card'
import AddBtn from '../components/AddTodoBtn';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { IoPowerOutline } from "react-icons/io5"
import { Navigate } from "react-router-dom";

import { Modal } from 'antd';
import { Button, Form, Input} from 'antd';

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
};


export default function MainPage() {
    const [userName, setUserName] = useState(null);
    const [todoList, setTodoList] = useState([]);
    const [newTitle, setNewTitle] = useState(null);
    const [newDesc, setNewDesc] = useState(null);
    const [logoutComp, setLogoutComp] = useState(false);
    const [sessionComp, setSessionComp] = useState(false);


    const [addModalOpen, setAddModalOpen] = useState(false);
    const showModal = () => {
        console.log("Add Modal Clicked")
        setAddModalOpen(true);
    };
    const handleOk = () => {
        setAddModalOpen(false);
    };
    const handleCancel = () => {
        setAddModalOpen(false);
    };
    const handleChangeTitle = (e) => {
        console.log("Check Target Title Value: ", e.target.value)
        setNewTitle(e.target.value);
    };
    const handleChangeDesc = (e) => {
        console.log("Check Target Desc Value: ", e.target.value)
        setNewDesc(e.target.value);
    };


    const GetUser = async () =>{
        try {
            const getResponse = await axios.get(`http://localhost:4000/users/username`)
            console.log("User Response:", getResponse)
           if (getResponse.status==200) {
                let data=getResponse.data.username;
                setUserName(data);
            }
           
        } catch (error) {
           console.log("Errors", error)
        }
    }

    const GetUserStatus = async () =>{
      try {
          const getResponse = await axios.get(`http://localhost:4000/users/status`)
          console.log("User Response:", getResponse)
         
      } catch (error) {
        // console.log("Hello Error ")
        setSessionComp(true);
        console.log("Errors", error)
      }
    }

    const GetUserTodo = async () =>{
        try {
            const getResponse = await axios.get(`http://localhost:4000/todos/get`)
            console.log("User Todo Response:", getResponse)
           if (getResponse.status==200) {
                let data=getResponse.data;
                setTodoList(data);
            }
           
        } catch (error) {
           console.log("Errors", error)
        }
    }
    const AddTodo = async () =>{
        try {
            const getResponse = await axios.post(`http://localhost:4000/todos/create`, 
                { 
                    title:`${newTitle}`,
                    description: `${newDesc}`,
                    completed:`${false}`
                }
            )
            console.log("User Response:", getResponse)
            handleCancel();
            GetUserTodo();
           
        } catch (error) {
           console.log("Errors", error)
        }
    }

    const LogoutUser = async () =>{
        try {
            const getResponse = await axios.post(`http://localhost:4000/users/logout`)
            console.log("User Todo Response:", getResponse)
           if (getResponse.status==200) {
                // alert("Logged Out Successfully")
                setLogoutComp(true);
            }
           
        } catch (error) {
           console.log("Errors", error)
        }
    }
    // console.log(todoList);

    useEffect(() => {
        GetUserStatus()
        GetUser()
        GetUserTodo()
    }, [])

    
  return (
    <>
      {sessionComp && (
        <Navigate to="/Login" replace/>
      )}
      {logoutComp && (
        <Navigate to="/" replace/>
      )}
      <div className="w-screen h-screen absolute z-0">
        <img
          src={LoginBg}
          alt="Background"
          className="w-screen object-cover h-[100%]"
          loading="lazy"
        />
      </div>
      <div className="w-screen h-screen relative z-10 flex justify-center items-center">
        <div className="w-[50vw] h-[80vh] border-2 border-[#FFF] flex flex-col justify-start items-center rounded-lg bg-blackrgba backdrop-filter backdrop-blur-[40px]">
          <div className="w-[100%] h-[10vh] flex justify-between items-center px-[2vw] shadow-xl">
            <div className='w-[auto] h-full flex justify-start items-center'>
                <span className="text-white font-serif text-[24px]">Welcome</span>
                <div className="w-2" />
                <span className="text-white font-serif text-[24px]">
                {userName}!
                </span>
            </div>
            <div
                className='group hover:cursor-pointer hover:bg-slate-100 w-[4vw] rounded-full h-[4vw] flex justify-center items-center'
                onClick={LogoutUser}
            >
                <IoPowerOutline className='text-[30px] text-white group-hover:text-[#FA7436]'/>
            </div>

          </div>
          <div className="w-[100%] h-[55vh] overflow-y-auto no-scrollbar px-[4vw] shadow-xl">
            {todoList.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                completed={item.completed}
                UpdateList={GetUserTodo}
              />
            ))}
          </div>
          <div className="w-[100%] h-[15vh] flex justify-end items-center pr-[2vw]">
            <AddBtn AddTodo={showModal} />
          </div>
        </div>
      </div>

      <Modal
        title="Add Task"
        open={addModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 800,
          }}
        >
          <Form.Item name={["Todo", "title"]} label="Title" >
            <Input value={newTitle} onChange={handleChangeTitle} />
          </Form.Item>
          <Form.Item name={["Todo", "Description"]} label="Description">
            <Input.TextArea value={newDesc} onChange={handleChangeDesc}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="default" htmlType="submit" onClick={AddTodo}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
