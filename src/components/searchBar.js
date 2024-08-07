import React, { useState }  from 'react';
import { Grid, TextField, Button, Box, InputAdornment } from '@mui/material';
// import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom'; //for navigation

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchValue, setsearchValue] = useState('');
    const handleChange = (event) => {
        setsearchValue(event.target.value);
    };
    const serchProduct=()=>{
        console.log(searchValue);
    }
    const newProductBtn=()=>{
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
                        <Button variant="outlined" sx={{ borderColor: '#001EB9', textTransform: 'none' }}>
                            <img src="/images/starred.svg" alt="icon" />
                        </Button>
                    </Box>
                </Grid>

            </Grid>

        </div>
    )
};

export default SearchBar;