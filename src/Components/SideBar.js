import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';  

function Layout({ open, openFunc }) {

  console.log({ open })
  return (
    <div style={{ backgroundColor: "black", display: 'flex', height: '100%' }}>
      <Drawer open={open}>
        <List>
          <ListItem key={'Menu'} disablePadding>
            <ListItemButton onClick={() => { openFunc(!open) }}>
              <ListItemText primary={'Menu'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          {/* {['Home', 'Live Map', 'Trajectory'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
             
          ))} */}
          <ListItem  disablePadding>
            <Link to='/'>
            <ListItemButton>
              <ListItemText primary={'Home'} />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem  disablePadding>
            <Link to='/map'>
            <ListItemButton>
              <ListItemText primary={'Live Map'} />
            </ListItemButton>
            </Link>
          </ListItem>
        

        </List>
      </Drawer>
    </div>
  );
}

export default Layout;