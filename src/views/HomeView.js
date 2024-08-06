import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setVendorData } from '../store/ecomstorageSlice'
import axios from '../axiosConfig';
import { Box } from '@mui/material';

import AppBar from './AppBar';
import SearchBar from '../components/searchBar';

const Home = () => {
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();
    // const [userdata, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('fetchUserData');
            /*create a vendor for development, requirment is only for a vender, 
              there for not develop authentication and authoraisation
              and also get vendor data, name and id. it save in redux store
              */
            await axios.post('/api/vendor/create_vendor', { "name": "ADMIN" })
                .then((response) => {
                    let udata = {
                        uname: response.data.name,
                        uid: response.data.uid
                    }
                    dispatch(setVendorData(udata));
                    console.log(udata);

                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });

        };
        fetchUserData();
    }, [dispatch]);



    return (
        <Box m={4} ml={8} mr={8}>
            <AppBar />
            <Box textAlign="left">
                <h1 style={{color:"#162427"}}>PRODUCTS</h1>
                <SearchBar />
            </Box>
        </Box>
    );
};

export default Home;