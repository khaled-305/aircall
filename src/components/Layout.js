import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Layout = ({ children }) => {
    return (
        <Box sx={{ width: '400px', height: '100vh', margin: 'auto' }}>
            <Paper>
               {children}
            </Paper>
        </Box>
    )
}

export default Layout