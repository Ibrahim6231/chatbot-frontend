import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete, Checkbox } from '@mui/material';
import { FaCheckSquare, FaRegSquare, FaUserPlus } from 'react-icons/fa';
import { getAllUsersApi } from '../../../api/user';
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { setAllUsers, setChatList } from '../../../app/slices/groupChatSlice';
import { createGroupApi, getGroupListApi } from '../../../api/group';


const AddGroupModal = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.groupChatState.allUsers);

  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);


  const fetchLatestUsersList = async () => {
    const users = await getAllUsersApi();
    if (users?.length) {
      dispatch(setAllUsers(users));
    }

  }
  const handleClickOpen = async () => {
    await fetchLatestUsersList()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchGroupChatList = async () => {
    const chatList = await getGroupListApi();
    if (chatList) {
      dispatch(setChatList(chatList))
    }
  }
  const handleCreateGroup = async () => {
    const usersId = selectedUsers.map(ele => ele._id);
    const resp = await createGroupApi(groupName, usersId);
    if (resp) {
      fetchGroupChatList();
      handleClose();
    }
  };

  const icon = <FaRegSquare />;
  const checkedIcon = <FaCheckSquare />;

  return (
    <>
      <FaUserPlus className="header-icon" onClick={handleClickOpen} title="Add Group" />

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Create a New Group</DialogTitle>
        <DialogContent style={{minWidth: "30rem"}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Name of the Group"
            type="text"
            fullWidth
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Autocomplete
            multiple
            options={users}
            disableCloseOnSelect
            getOptionLabel={(option) => option.fullName}
            value={selectedUsers}
            onChange={(event, newValue) => {
              setSelectedUsers(newValue);
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.fullName}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Add Users"
                placeholder="Search users"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddGroupModal;
