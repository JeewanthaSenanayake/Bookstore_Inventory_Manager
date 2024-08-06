import React from 'react';
import { useSelector} from 'react-redux'
import { Box } from '@mui/material';

const AppBar = () => {
    const vendorData = useSelector((state) => state.ecomstorage.vendorData)
    return (
        <header >
            
            {/* <h6>{vendorData.uname} </h6> */}
            <Box textAlign="right" >
                <b>{vendorData.uname}</b>
            
            {/* <Avatar
                sx={{}}
                alt="Remy Sharp"
                src="/broken-image.jpg"
            >
                A
            </Avatar> */}
            </Box>
        </header>
    );
};

export default AppBar;