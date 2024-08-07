import React,{ useEffect, useState } from "react";
import { Box } from '@mui/material';
import AppBar from './AppBar';
import SearchBar from '../components/searchBar';
import CircularProgress from '@mui/material/CircularProgress';
import TableComponent from '../components/tableComponent';
import axios from '../axiosConfig';
import { useDispatch } from 'react-redux'
import {setRowData } from '../store/ecomstorageSlice'

const FavouriteProduct = () => {
    const [tableLoading, setTableLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {

            //get product data
            await axios.get('/api/product/favourite_products')
                .then(async (response) => {
                    console.log(response.data);
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
                <h1 style={{ color: "#162427" }}>FAVOURITE PRODUCTS</h1>
                <SearchBar />
            </Box>
            {tableLoading ?
                <Box mt={3}>
                    <CircularProgress />
                </Box>
                :
                <TableComponent isFromFav={true} />
            }
        </Box>
  );
};

export default FavouriteProduct;

