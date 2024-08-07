import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "../axiosConfig";
import { useNavigate } from 'react-router-dom'; //for navigation


const TableComponent = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'sku', headerName: 'SKU', width: 220 },
        {
            field: 'thumbnail', headerName: 'IMAGE', width: 220, renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Avatar"
                    style={{ width: 50, height: 50 }}
                />
            ),
        },
        { field: 'product_name', width: 220, headerName: 'PRODUCT NAME' },
        {
            field: 'price', width: 220, headerName: 'PRICE', headerAlign: 'center', align: 'center'
        },
        {
            field: 'id', headerName: '', width: 220, headerAlign: 'right', align: 'right', renderCell: (params) => (
                <Box gap={1}>
                    <img
                        src="/images/delete-icon.svg"
                        alt="Avatar"
                        style={{ width: 18, height: 18, marginRight: 7 }}
                        onClick={() => handleClickOpen(params.value)}
                    />
                    <img
                        src="/images/edit-icon.svg"
                        alt="Avatar"
                        style={{ width: 18, height: 18, marginRight: 7 }}
                        onClick={() => handleEdit(params.value)}
                    />
                    <img
                        src="/images/starred.svg"
                        alt="Avatar"
                        style={{ width: 18, height: 18, marginRight: 7 }}
                    />
                </Box>

            ),
        },

    ];

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null)

    const handleClickOpen = (id) => {
        console.log(id)
        setSelectedId(id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async () => {
        console.log(selectedId)
        setOpen(false);

        await axios.delete(`http://localhost:5000/api/product/delete_products/${selectedId}`).then((res) => {
            console.log(res.data)
            if(res.data.status === 'success'){
                setOpen(false);
                console.log('Deleted')

            }
        }).catch((err) => {
            console.log(err)
        });
        window.location.reload();
    }

    const handleEdit = (id) => {
        console.log('Edit')
        localStorage.setItem('edit_id', id);
        navigate('/edit-product');
    }

    const rows = useSelector((state) => state.ecomstorage.rowData)

    return (

        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box mt={2} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <img src="/images/alert.svg" alt="Avatar" style={{ width: 50, height: 50 }} />
                    </Box>
                    <Box textAlign={"center"} ml={2} mr={2}>
                        <h3>ARE YOU SURE?</h3>
                        <h5>You will not be able to undo this action if you proceed!</h5>
                    </Box>
                    <Box gap={4} m={3} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Button variant="outlined" onClick={handleClose} sx={{ borderColor: '#001EB9', textTransform: 'none', color: 'black' }}>
                            Cancle
                        </Button>
                        <Button variant="contained" onClick={handleDelete} sx={{ backgroundColor: '#001EB9', '&:hover': { backgroundColor: '#001EB9' }, textTransform: 'none' }}>
                            Delete
                        </Button>
                    </Box>
                </DialogContent>

            </BootstrapDialog>

            <Box mt={2}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 50]}
                        // set hedders test styes
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                color: '#001EB9', // Header text color
                                fontWeight: 'bold', // Header text style
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#001EB9', // Title color
                                fontWeight: 'bold'
                            }
                        }}
                    />
                </div>
            </Box>
        </div>
    );
}

export default TableComponent;