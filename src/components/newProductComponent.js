import React, { useRef, useState } from "react";
import { Box, TextField, Grid, Button, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom'; //for navigation

const NewProductComponent = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imgeFiles, setImageFiles] = useState([]);
  const [selectedThumbnailId, setSelectedThumbnailId] = useState(0);
  const [sku, setSku] = useState(null);
  const [name, setName] = useState(null);
  const [qty, setQty] = useState(null);
  const [description, setDescription] = useState(null);
  const [dataValidation, setDataValidation] = useState(true);
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSkuChange = (event) => {
    setSku(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const uploadProduct = async () => {

    if (!sku || !name || !qty || !description || imgeFiles.length === 0) {
      setDataValidation(false);
    } else {
      setLoading(true);
      var imageIds = [];
      for (const img of imgeFiles) {
        const formData = new FormData();
        formData.append('image', img);

        await axios.post('/api/product/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
          console.log('Image Uploaded', response.data.image_id);
          imageIds.push(response.data.image_id);
        }).catch((error) => {
          console.error('There was an error!', error);
        });
      }

      console.log('Image Ids: ', imageIds);
      const productData = {
        "product_name": name,
        "sku": sku,
        "quantity": qty,
        "product_discription": description,
        "thumbnail": imageIds[selectedThumbnailId],
        "product_images": imageIds,
        "price": "$24.00"

      }
      console.log('Product Uploaded', productData);

      await axios.post('/api/product/add_product', productData).then((response) => {
        console.log('Product Uploaded', response.data);
        navigate('/');
      }).catch((error) => {
        console.error('There was an error!', error);
        setDataValidation(false);
      }).finally(() => {
        setLoading(false);
      });
    }

  }


  const handleLinkClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setImageFiles(imageFiles);
    setSelectedImages(imageFiles.map(file => URL.createObjectURL(file)));
  };

  const selectThumbNail = (index) => {
    console.log('Selected Image: ', index);
    console.log('Selected Image: ', selectedImages[index]);
    setSelectedThumbnailId(index);
  }

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={5}>
          <Box display="flex" gap={3} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={2} textAlign={'left'}>
                <p>SKU</p>
              </Grid>
              <Grid item xs={10}>
                <TextField variant="outlined" size="small" onChange={handleSkuChange} value={sku} sx={{
                  width: '100%',
                  height: '35px',
                  marginTop: '8px',

                  '& .MuiOutlinedInput-root': {
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
                }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={5}>
          <Box display="flex" gap={3} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={2} textAlign={'left'}>
                <p>Name</p>
              </Grid>
              <Grid item xs={10}>
                <TextField variant="outlined" size="small" onChange={handleNameChange} value={name} sx={{
                  width: '100%',
                  height: '35px',
                  marginTop: '8px',

                  '& .MuiOutlinedInput-root': {
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
                }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <Box display="flex" gap={3} mt={1}>
            <Grid container spacing={2}>
              <Grid item xs={2} textAlign={'left'}>
                <p>QTY</p>
              </Grid>
              <Grid item xs={10}>
                <TextField variant="outlined" size="small" type="number" onChange={handleQtyChange} value={qty} sx={{
                  width: '100%',
                  height: '35px',
                  marginTop: '8px',

                  '& .MuiOutlinedInput-root': {
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
                }} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign={'left'} mt={2}>
        <p>Product Discription</p>
        <p style={{ color: "#969191", fontSize: '11px' }}>A small discription aabout the product</p>
        <TextField
          multiline
          rows={3}
          variant="outlined"
          onChange={handleDescriptionChange} value={description}
          sx={{
            width: '100%',
            // height: '35px',
            // marginTop: '8px',

            '& .MuiOutlinedInput-root': {
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
        />
      </Box>
      <Box textAlign={'left'} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={2} textAlign={'left'}>
            <p>Product Images</p>
            <p style={{ color: "#969191", fontSize: '11px' }}>JPEG, PNG, SVG, or GIF <br></br>(Maximum file size 50MB)</p>
          </Grid>
          <Grid item xs={2} textAlign={'left'} mt={1.5}>
            <a href="/" onClick={handleLinkClick} style={{ color: 'blue', textDecoration: 'underline' }}>Add Images</a>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2}>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div style={{ marginTop: '20px' }}>
            <Box display="flex" gap={1} mt={1}>
              {selectedImages.map((src, index) => (
                <img key={index} src={src} alt={`Selected ${index}`} style={{ width: '75px', marginRight: '10px', marginBottom: '10px', border: selectedThumbnailId === index ? '2px solid blue' : '2px solid transparent' }} onClick={() => selectThumbNail(index)} />
              ))}
              {
                selectedImages.length === 0 ? null : <p style={{ color: "#969191", fontSize: '12px' }}>Select a thumbnail</p>
              }
            </Box>
          </div>
        </Grid>
      </Box>
      <div style={{ textAlign: 'right' }}>
        {dataValidation ? null :
          <Box mb={2}>
            <Alert severity="error" >Please fill all the feilds and upload images.</Alert>
          </Box>
        }
        <Button disabled={loading} variant="contained" onClick={uploadProduct} sx={{ backgroundColor: '#001EB9', '&:hover': { backgroundColor: '#001EB9' }, textTransform: 'none', width: '175px' }}>
        {loading && <CircularProgress size={24} style={{ position: 'absolute' }} />}
          Add Product
        </Button>

      </div>
    </div>
  );
}

export default NewProductComponent;