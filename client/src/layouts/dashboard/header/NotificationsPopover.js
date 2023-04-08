import PropTypes from 'prop-types';
//import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState, useEffect} from 'react'
import Axios from 'axios'

// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
// utils
//import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: ' insurance will expire after 2 days',
    description: 'you need to renew it',
    type: 'insurance',
    //createdAt: set(new Date(), { hours: 1, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: ' still have 2 days left for the visit',
    description: 'you should take a look of your car',
    type: 'visit',
    //createdAt: sub(new Date(), { days: 0, hours: 0, minutes: 1 }),
    isUnRead: false,
  },
];
    
export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };



  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const { title_insurance, title_visit } = RenderContent(notification) || {};

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemText
        primary={title_insurance}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {/* <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />

      <ListItemText
        primary={title_visit}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {/* <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)} */}
          </Typography>
        }
      />

    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function RenderContent(notification) {
  const [cars, setCars] = useState([]);
  var mat_Ins 
  var mat_Vis 

  //read car
  useEffect(() => {
    Axios.get("http://localhost:7777/cars")
      .then(res => {
        setCars(res.data)
      })
  },[cars])

  const now = new Date();

  const title_insurance = (
    <Typography variant="subtitle2">
      Your {mat_Ins}{notification.title_insurance}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  const title_visit = (
    <Typography variant="subtitle2">
      Your {mat_Vis}{notification.title_visit}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  cars.forEach((car) => {
    // const date_ins = new Date(car.la_date_de_lassurance)
    // const duree_ins = car.la_duree_de_lassurance*30*24*60*60*1000
    // const expirationAssurance = new Date(date_ins.getTime() + duree_ins)
    // const diffTime_ins = Math.abs(now.getTime() - expirationAssurance.getTime());
    // const diffDays_ins = Math.ceil(diffTime_ins / (1000 * 60 * 60 * 24)); 


    // const expirationVisit = new Date(car.la_date_de_visite);
    // expirationVisit.setFullYear(expirationVisit.getFullYear() + 1);
    // const diffTime_vis = Math.abs(now.getTime() - expirationVisit.getTime());
    // const diffDays_vis = Math.ceil(diffTime_vis / (1000 * 60 * 60 * 24)); 


  })
  if (notification.type === 'insurance') {
    //mat_Ins = car.matricule 
    return {  
      title_insurance,
    };
  }
  if (notification.type === 'visit') {
    //mat_Vis = car.matricule 
    return {
      title_visit,
    };
  }
}
