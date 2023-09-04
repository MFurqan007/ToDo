import React from 'react'
import { BsCheck2Circle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"
import { Button, Modal } from 'antd';
import { useState } from 'react'

export default function Card() {

  const [isModalOpen, setIsModalOpen] = useState(false);
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

    if (inputString.length <= 65) {
      return inputString;
    }
  
    return inputString.slice(0, 60) + ' ...';
  }

  return (
    <>
    <div className='w-[40vw] mt-[5px] h-[10vh] flex justify-start items-center px-[2vw] shadow-lg bg-slate-100 opacity-70 rounded-[20px]'>
      <div className='w-[28vw] h-full' onClick={showModal}>
        <p className='text-[#101010] font-[700] text-[22px]'>{TitalValidate("This is a long string that needs to be truncated to 50 characters or less.")}</p>
        <p className='text-stone-600 font-normal text-[14px]'>{DescValidate("This is a long string that needs to be truncated to 50 characters or less.")}</p>
      </div>
      <div className='w-[8vw] h-full flex justify-evenly items-center'>
        <FiEdit className='hover:text-[#FA7436] w-[3vw] h-[50%] hover:cursor-pointer'/>
        <AiOutlineDelete className='hover:text-[red] w-[3vw] h-[60%] hover:cursor-pointer'/>
      </div>

    </div>
    {/* Modify Modal */}
    <Modal title="Task View" open={isModalOpen} okButtonProps={{ type:"default" }}  onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
    </>
    
  )
}
