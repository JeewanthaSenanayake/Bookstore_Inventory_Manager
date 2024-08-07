import React from "react";
import { Box } from '@mui/material';
import AppBar from '../views/AppBar';
import SearchBar from '../components/searchBar';
import { useSelector } from 'react-redux'

const SearchResults = () => {
    const SearchData = useSelector((state) => state.ecomstorage.rowData)
    
    return (
        <Box m={4} ml={8} mr={8}>
            <AppBar />
            <Box textAlign="left">
                <h1 style={{ color: "#162427" }}>PRODUCTS</h1>
                <SearchBar />
            </Box>
            <Box textAlign={"left"}>
                <h4 style={{ color: "#969191" }} >{SearchData.length} results found </h4>
            </Box>
            <div style={{ marginTop: '20px' }}>
            <Box textAlign={"left"} mt={1}>
              {SearchData.map((src, index) => (
                <Box mt={2}>
                    <h3 style={{ color: "#001EB9" }}>{src.sku}</h3>
                    <h3>{src.product_name}</h3>
                    <p >{src.description}</p>
                
                    <hr></hr>
                </Box>
              ))}
              
            </Box>
          </div>
        </Box>
    );
};

export default SearchResults;
