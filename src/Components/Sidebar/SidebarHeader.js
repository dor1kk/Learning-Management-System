import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';

const SidebarHeader = ({ name }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export default SidebarHeader;
