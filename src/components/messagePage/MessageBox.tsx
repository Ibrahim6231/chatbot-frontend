import React, { useEffect, useState } from 'react';
import './MessageBox.scss';
import LongMenu from '../modals/MuiOptionMenu/LongMenu';
import { deleteMessageApi, updateMessageApi } from '../../api/message';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useAppSelector } from '../../app/reduxHooks';
import toast from 'react-hot-toast';

const MessageBox = ({ message, messages, setMessages }) => {

  const user = useAppSelector(state => state.userState.user);
  const userId = user?._id || ""
  const [isMsgLikedByUser, setIsMsgLikedByUser] = useState<boolean>(false);
  const options = [
    isMsgLikedByUser ? "remove like" : "like",
    "delete",
    "edit",
    "forward",
  ];

  const renderMessagesByUpdatedMsg = (updatedMsg: any, isDeleted?: boolean) => {
    const updatedMsgIdx = messages.findIndex(ele => ele._id == updatedMsg._id);
    if (updatedMsgIdx !== -1) {
      if (isDeleted) {
        messages.splice(updatedMsgIdx, 1);
      } else {
        messages[updatedMsgIdx] = { ...messages[updatedMsgIdx], ...updatedMsg };
      }
      setMessages([...messages])
    }
  }

  const handleOptionClick = async (selctedOption: string) => {
    switch (selctedOption) {
      case "like": {
        const updatedMsg = await updateMessageApi(message._id, { likeIncrement: 1 });
        renderMessagesByUpdatedMsg(updatedMsg);
        alert("hit update api & setMessage")
        break;
      }
      case "remove like": {
        const updatedMsg = await updateMessageApi(message._id, { likeIncrement: -1 });
        renderMessagesByUpdatedMsg(updatedMsg);
        alert("hit update api & setMessage")
        break;
      }
      case "delete": {
        const isConfirm = window.confirm("Are you sure, this message will be deleted ?")
        if (isConfirm) {
          const isDeleteSuccess = await deleteMessageApi(message._id, message.senderId);
          if (isDeleteSuccess) {
            toast.success("Message deleted!")
            renderMessagesByUpdatedMsg(message, true);
          }
        }
        break;
      }
      case "edit": {
        alert("This feature has been skipped due to limited timeframe of the assignment")
        break;
      }
      case "forward": {
        alert("This feature has been skipped due to limited timeframe of the assignment")
        break;
      }
    }
  }

  useEffect(() => {
    if (message.likes && message.likes.includes(userId)) {
      setIsMsgLikedByUser(true);
    }
  }, [message])


  return (
    <div className={`message ${message?.isUserMsg ? 'sent' : 'received'}`}>
      <div className="top-section">
        <div className="info-box">
          {!message?.isUserMsg && <>
            <div className="name">{message.sName}</div>
            <div className="email">{`${message.sEmail}`}</div>
          </>
          }
          <div>{new Date(message.createdAt).toLocaleString()}</div>
          {message.likes?.length ? <>
            <div className="likes">
              {isMsgLikedByUser ? <AiFillLike /> : <AiOutlineLike />}
              {message.likes.length}
            </div>
          </>
            : null
          }
        </div>
        <div id="message-options">
          <LongMenu options={options} handleOptionClick={handleOptionClick} />
        </div>
      </div>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
    </div >
  )
};

export default MessageBox;
