import * as React from 'react';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import PhoneCallbackRoundedIcon from '@mui/icons-material/PhoneCallbackRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import Layout from './Layout';

const fetcher = url => axios.get(url).then(res => res.data);

export default function ActivityDetail() {
    const { activityId } = useParams();
    const API_URL = `https://aircall-job.herokuapp.com/activities/${activityId}`;
    const { data, error } = useSWR(API_URL, fetcher);
    const [checked, setChecked] = React.useState(false);


    React.useEffect(() => {
        setChecked(data?.is_archived)
    },[data])


    const handleChange = async (event) => {
        event.preventDefault()

        await axios({
            method: 'post',
            url: API_URL,
            data: {
                is_archived: !checked
            }
        })
            .then((res) => {
                setChecked( !checked );
            })
    };

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (

        <Layout>
            {console.log(data)}
            { console.log(checked)}
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhoneInTalkRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.from} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhoneIphoneRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.to} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhoneCallbackRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.from} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DateRangeRoundedIcon />
                            </ListItemIcon>
                            <ListItemText style={{ color: "red" }} primary={moment(data.created_at).fromNow()} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>

            {checked === true ?
                <Button
                    onClick={handleChange}
                    variant="outlined"
                    startIcon={<ArchiveRoundedIcon
                    />}>
                    UnArchive
                </Button> :
                <Button
                    onClick={handleChange}
                    variant="contained"
                    startIcon={<ArchiveRoundedIcon
                    />}>
                    Archive
                </Button>
            }

            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={data.via} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary={data.call_type} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Layout>
    );
}
