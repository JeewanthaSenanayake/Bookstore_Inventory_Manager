import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux'

const TableComponent = () => {

    const columns = [
        { field: 'sku', headerName: 'SKU',width:220 },
        {
            field: 'thumbnail', headerName: 'IMAGE',width:220, renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Avatar"
                    style={{ width: 50, height: 50 }}
                />
            ),
        },
        { field: 'product_name',width:220, headerName: 'PRODUCT NAME' },
        {
            field: 'price',width:220, headerName: 'PRICE',headerAlign: 'center', align: 'center'
        },
        {
            field: '_id', headerName: '',width:220,headerAlign: 'right', align: 'right' , renderCell: (params) => (
                <Box gap={1}>
                    <img
                        src="/images/delete-icon.svg"
                        alt="Avatar"
                        style={{ width: 18, height: 18, marginRight: 7 }}
                    />
                    <img
                        src="/images/edit-icon.svg"
                        alt="Avatar"
                        style={{ width: 18, height: 18, marginRight: 7 }}
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


    const rows = useSelector((state) => state.ecomstorage.rowData)
    return (

        <div>
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
                        pageSizeOptions={[5, 10,50]}
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