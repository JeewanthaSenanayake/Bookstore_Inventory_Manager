import React, { useState } from 'react';
import { Grid, TextField, Button, Box, InputAdornment } from '@mui/material';
// import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom'; //for navigation
import { useDispatch } from 'react-redux'
import { setSearchResults } from '../store/ecomstorageSlice'

import axios from '../axiosConfig';

const SearchBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setsearchValue] = useState('');
    const handleChange = (event) => {
        setsearchValue(event.target.value);
    };
    const serchProduct = async () => {
        console.log(searchValue);

        await axios.get(`/api/product/search?q=${searchValue}`).then(async (response) => {
            console.log(response.data);
            var serchResults = []
            for (const element of response.data) {
                const tempData = {
                    id: element._id,
                    sku: element.sku,
                    thumbnail: element.thumbnail,
                    product_name: element.product_name,
                    price: element.price,
                    favourite: element.favourite,
                    description: element.product_discription
                };
                serchResults.push(tempData);

            }
            dispatch(setSearchResults(serchResults))
        }).catch((error) => {
            console.error('There was an error!', error);
        });


        navigate('/search')
    }
    const favouriteProductBtn = () => {
        console.log('favourite product');
        navigate('/favourite-product')
    }

    const newProductBtn = () => {
        console.log('new product');
        navigate('/new-product');
    }
    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={7}>
                    <TextField
                        onChange={handleChange}
                        value={searchValue}
                        sx={{
                            width: '100%',
                            borderRadius: '35px',

                            '& .MuiOutlinedInput-root': {
                                borderRadius: '35px',
                                '& fieldset': {
                                    border: 'none', // Remove the outline
                                },
                                '&:hover fieldset': {
                                    border: 'none', // Remove the outline on hover
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none', // Remove the outline when focused
                                },
                            },
                            backgroundColor: '#F7F7F7', '&:hover': { backgroundColor: '#F7F7F7' }
                        }}

                        variant="outlined"
                        placeholder="Search for products"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={serchProduct} variant="contained" startIcon={<SearchIcon />} style={{ backgroundColor: '#001EB9', color: 'white', borderRadius: 20, textTransform: 'none' }}>
                                        <span style={{ marginRight: 0 }}><i className="fas fa-search"></i></span>Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <Box display="flex" gap={2} mt={1}>
                        <Button variant="contained" onClick={newProductBtn} sx={{ backgroundColor: '#001EB9', '&:hover': { backgroundColor: '#001EB9' }, textTransform: 'none', width: '175px' }}>
                            New Product
                        </Button>
                        <Button variant="outlined" onClick={favouriteProductBtn} sx={{ borderColor: '#001EB9', textTransform: 'none' }}>
                            <img src="/images/starred.svg" alt="icon" />
                        </Button>
                    </Box>
                </Grid>

            </Grid>

        </div>
    )
};

export default SearchBar;