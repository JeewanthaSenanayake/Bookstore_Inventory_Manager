import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setVendorData, setRowData } from '../store/ecomstorageSlice'
import axios from '../axiosConfig';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import AppBar from './AppBar';
import SearchBar from '../components/searchBar';
import TableComponent from '../components/tableComponent';

const Home = () => {

    const dispatch = useDispatch();

    const [tableLoading, setTableLoading] = useState(true)

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
                   

                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });

            //get product data
            await axios.get('/api/product/get_products')
                .then(async (response) => {
                    
                    var rowDataFinal = [];
                    for (const element of response.data) {
                        //get image acording to product
                        await axios.get(`/api/product/getImg/${element.thumbnail}`, { responseType: 'blob' }).then(async (response) => {

                            const imageUrl = URL.createObjectURL(response.data)
                            const rowData = {
                                id: element._id,
                                sku: element.sku,
                                thumbnail: imageUrl.toString(),
                                product_name: element.product_name,
                                price: element.price,
                                favourite: element.favourite
                            };
                            rowDataFinal.push(rowData);
                        })
                    }
                    // setRows(rowDataFinal);
                    setTableLoading(false)
                    dispatch(setRowData(rowDataFinal))
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
                <h1 style={{ color: "#162427" }}>PRODUCTS</h1>
                <SearchBar />
            </Box>
            {tableLoading ?
                <Box mt={3}>
                    <CircularProgress />
                </Box>
                :
                <TableComponent isFromFav={false} />
            }
        </Box>
    );
};

export default Home;