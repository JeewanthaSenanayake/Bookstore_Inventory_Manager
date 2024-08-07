import React from "react";
import { Box } from '@mui/material';
import AppBar from './AppBar';
import NewProductComponent from "../components/newProductComponent";
const NewProduct = () => {
    return (
        <Box m={4} ml={8} mr={8}>
            <AppBar />
            <Box display="flex" gap={1} mt={1}>
                <h1 style={{ color: "#162427" }}>PRODUCTS</h1>
                <img src="/images/arrow.svg" alt="icon" />
                <Box mt={1.35}>
                <h5 style={{ color: "#001EB9" }}>Add new product</h5>
                </Box>
            </Box>
            <NewProductComponent />
        </Box>
    );
}

export default NewProduct;