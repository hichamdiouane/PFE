import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import Axios from 'axios';
// @mui
import {
  Box,
  List,
  Badge,
  Avatar,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: ' insurance will expire after 2 days',
    description: 'you need to renew it',
    avatar: null,
    type: 'insurance',
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: ' still have 2 days left for the visit',
    description: 'you should take a look of your car',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'visit',
    isUnRead: true,
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
              <NotificationItem key={notification.id} notification={notification} onClick={notification.isUnRead = false} />
            ))}
          </List>
        </Scrollbar>
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
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title1, title2 } = RenderContent(notification)|| {};

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
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title1}
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
          </Typography>
        }
      />

      <ListItemText
        primary={title2}
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
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function RenderContent(notification) {
  const [cars, setCars] = useState([]);
  var ins=0,vis=0
  //read car
  useEffect(() => {
    Axios.get("http://localhost:7777/cars")
      .then(res => {
        setCars(res.data)
      })
  },[cars])

  const title1 = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );
  const title2 = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );
  const now = new Date();
  cars.forEach((car) => {
    const date_ins = new Date(car.la_date_de_lassurance)
    const duree_ins = car.la_duree_de_lassurance*30*24*60*60*1000
    const expirationAssurance = date_ins.getTime() + duree_ins
    const diffTime_ins = Math.abs(now.getTime() - expirationAssurance);
    const diffDays_ins = Math.ceil(diffTime_ins / (1000 * 60 * 60 * 24));
    if(diffDays_ins <= 1){
      ins = car.matricule
    }
    const expirationVisit = new Date(car.la_date_de_visite);
    expirationVisit.setFullYear(expirationVisit.getFullYear() + 1);
    const diffTime_vis = Math.abs(now.getTime() - expirationVisit.getTime());
    const diffDays_vis = Math.ceil(diffTime_vis / (1000 * 60 * 60 * 24));  
    if(diffDays_vis === 2){
      vis = car.matricule
    }
  })

  if (ins !== 0 && notification.type === 'insurance') {
    notification.title = `Your  ${ins}'s  insurance will expire after 2 days`
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_package.svg" />,
      title1,
    };
  }
  
  if (vis !== 0  && notification.type === 'visit') {
    notification.title = `Your  ${vis}  still have 2 days left for the visit`
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_shipping.svg" />,
      title2,
    };
  }
}
