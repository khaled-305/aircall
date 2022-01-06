import * as React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';

import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import Layout from './Layout';

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 530,
    bottom: 75,
    left: 'auto',
    position: 'fixed',
};


const fetcher = url => axios.get(url).then(res => res.data);

export default function ActivityFeed() {
    const { data, error } = useSWR('https://aircall-job.herokuapp.com/activities', fetcher);
    const [value, setValue] = React.useState(0);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <Layout>
            {console.log(data)}
            <CssBaseline />
            <Paper square sx={{ pb: '50px', height: '100vh' }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Phone Calls ({data?.filter(calls => calls.is_archived === false)?.length})
                </Typography>

                <List sx={{ mb: 2 }}>
                    {data?.filter(calls => calls.is_archived === false).map(call => (
                        <React.Fragment>
                            <ListItem button
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ArchiveIcon />
                                    </IconButton>
                                }
                                style={{ color: call.call_type == 'missed' ? "red" : "blue" }}
                                component={Link} to={`/activity/${call.id}`} key={call.id}
                            >
                                <ListItemAvatar>
                                    <PhoneCallbackOutlinedIcon />
                                </ListItemAvatar>
                                <ListItemText primary={call.from} secondary={call.to} />
                            </ListItem>

                            <Divider>
                                <Chip label={moment(call.created_at).fromNow()} />
                            </Divider>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        component={Link} 
                        to={'/'}
                        label="Recents"
                        icon={<PhoneOutlinedIcon />}
                    />
                    <BottomNavigationAction label="Favorites" icon={<GroupOutlinedIcon />} />
                    <BottomNavigationAction
                        component={Link} 
                        to={'/archived'}
                        label="Archive"
                        icon={<ArchiveOutlinedIcon />}
                    />
                </BottomNavigation>
            </Paper>

            <Fab style={fabStyle} color="primary" aria-label="add">
                <KeyboardAltOutlinedIcon />
            </Fab>
        </Layout>
    );
}


