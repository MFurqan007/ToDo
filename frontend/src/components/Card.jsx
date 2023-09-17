import React from 'react'
import { BsCheck2Circle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"
import { Modal } from 'antd';
import { useState } from 'react'
import { Button, Form, Input} from 'antd';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function Card(props) {

  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(null);
  const [editDesc, setEditDesc] = useState(null);
 

  const [editModalOpen, setEditModalOpen] = useState(false);
  const eshowModal = () => {
      console.log("Edit Modal Clicked")
      setEditModalOpen(true);
  };
  const ehandleOk = () => {
      setEditModalOpen(false);
  };
  const ehandleCancel = () => {
      setEditModalOpen(false);
  };
  const ehandleChangeTitle = (e) => {
      console.log("Check Target Edit Title Value: ", e.target.value)
      setEditTitle(e.target.value);
  };
  const ehandleChangeDesc = (e) => {
      console.log("Check Target Edit Desc Value: ", e.target.value)
      setEditDesc(e.target.value);
  };

  const EditTodo = async () =>{
    try {
        const getResponse = await axios.post(`http://localhost:4000/todos/update/${props.id}`, 
            { 
              title:`${editTitle}`,
              description: `${editDesc}`,
              completed:`${false}`
            }
        )
        console.log("User Response:", getResponse)
        ehandleCancel();
        props.UpdateList();
       
    } catch (error) {
       console.log("Errors", error)
    }
  }

  const DeleteTodo = async () =>{
    try {
        const getResponse = await axios.delete(`http://localhost:4000/todos/delete/${props.id}`)
        console.log("User Response:", getResponse)
        props.UpdateList();
       
    } catch (error) {
       console.log("Errors", error)
    }
  }

  const CompleteTodo = async () =>{
    let uComp = false; 
    if (props.completed == false){
      uComp = true;
    }
    try {
        const getResponse = await axios.post(`http://localhost:4000/todos/update-completeness/${props.id}`,
          {
            completed:`${uComp}`
          }
        )
        console.log("User Response:", getResponse)
        props.UpdateList();       
    } catch (error) {
       console.log("Errors", error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function TitalValidate(inputString) {

    if (inputString.length <= 25) {
      return inputString;
    }
  
    return inputString.slice(0, 25) + '...';
  }

  function DescValidate(inputString) {

    if (inputString.length <= 55) {
      return inputString;
    }
  
    return inputString.slice(0, 55) + ' ...';
  }

  return (
    <>
    <div className='w-[40vw] mt-[5px] h-[10vh] flex justify-start items-center px-[2vw] shadow-lg bg-slate-100 opacity-70 rounded-[20px]'>
      <div className='w-[26vw] h-full' onClick={showModal}>
        <p className='text-[#101010] font-[700] text-[22px]'>{props.title? TitalValidate(props.title) : ""}</p>
        <p className='text-stone-600 font-normal text-[14px]'>{props.description? DescValidate(props.description) : ""}</p>
      </div>
      <div className='w-[10vw] h-full flex justify-start items-center'>
        <div className='w-[3vw] h-full flex items-start justify-center'>
          <FiEdit className='hover:text-[#FA7436] w-[3vw] h-[50%] hover:cursor-pointer' onClick={eshowModal}/>
        </div>
        <div className='w-[3vw] h-full flex items-end justify-center'>
          <AiOutlineDelete className='hover:text-[red] w-[3vw] h-[60%] hover:cursor-pointer' onClick={DeleteTodo}/>
        </div>
        <div className='w-[4vw] h-full flex items-center justify-end'>
          <BsCheck2Circle 
            className={props.completed? 'text-green-700 w-[3vw] h-[65%] hover:cursor-pointer' : 'hover:text-green-700 w-[3vw] h-[65%] hover:cursor-pointer' } 
            onClick={CompleteTodo}
          />
        </div>        
      </div>

    </div>

    {/* Modify Modal */}
    <Modal title="Task View" open={isModalOpen} okButtonProps={{ style: {display:'none'} }} cancelButtonProps={{style: {display:'none'}}}  onOk={handleOk} onCancel={handleCancel}>
      <p className='text-[#101010] font-[700] text-[22px]'>{props.title}</p>
      <p className='text-stone-600 font-normal text-[14px]'>{props.description}</p>
    </Modal>

    
    <Modal
      title="Edit Task"
      open={editModalOpen}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={ehandleOk}
      onCancel={ehandleCancel}
    >
      <Form
        {...layout}
        name="nest-messages"
        style={{
          maxWidth: 800,
        }}
      >
        <Form.Item name={["Todo", "title"]} label="Title" >
          <Input value={editTitle} onChange={ehandleChangeTitle} placeholder={props.title}/>
        </Form.Item>
        <Form.Item name={["Todo", "Description"]} label="Description">
          <Input.TextArea value={editDesc} onChange={ehandleChangeDesc} placeholder={props.description}/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="default" htmlType="submit" onClick={EditTodo}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </>
    
  )
}
