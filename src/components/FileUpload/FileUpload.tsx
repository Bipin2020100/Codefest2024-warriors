import { observer } from "mobx-react";
import { FileUploadVM, IFileUploadProps } from "./FileUploadVM";
import React, { useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Grid, Paper, Button, MenuItem, Select, Box } from '@mui/material';
import { Search as SearchIcon, UploadFile as UploadFileIcon, Folder as FolderIcon, Dashboard as DashboardIcon, FolderOpen as FolderOpenIcon,UploadFileOutlined, InsertDriveFile as InsertDriveFileIcon, Construction } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DottedTextArea = styled('div')(({ theme }) => ({
  border: '2px dotted lightgrey',
  backgroundColor: '#ffffff',
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
  height: '130px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const FolderArea = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '40px',
  marginTop: '20px',
});

const FolderItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.grey[700],
}));

const FutureDevelopment = () => (
  <Box sx={{ padding: 4, textAlign: 'center' , backgroundColor: '#f5f5f5', height: '250%' }}>
    <Typography variant="h4" sx={{ padding: 4, fontSize:30,fontWeight:'bold', marginTop:10, textAlign: 'center',color: 'primary.main' }}>Future Development: Work in Progress</Typography>
    <Construction sx={{ marginRight: 1, color: 'primary.main', fontSize:100 }} />
  </Box>
);

export const FileUpload = observer((props: IFileUploadProps) => {
  const vm = useRef(new FileUploadVM(props)).current;
  const [sortBy, setSortBy] = useState('');
  const [fileName, setFileName] = useState('');

  const handleSortByChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      vm.handleFileChange(event);
    }
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginBottom: 2 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Doc Fill
            </Typography>
            <Search sx={{ width: 'calc(100% - 200px)', marginLeft: 'auto' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <NavItem to="/" end>
              <DashboardIcon sx={{ marginRight: 1 }} />
              <Typography variant="h6">Dashboard</Typography>
            </NavItem>
            <NavItem to="/folders">
              <FolderOpenIcon sx={{ marginRight: 1 }} />
              <Typography variant="h6">Folders</Typography>
            </NavItem>
            <NavItem to="/files">
              <InsertDriveFileIcon sx={{ marginRight: 1 }} />
              <Typography variant="h6">Files</Typography>
            </NavItem>
          </Grid>

          <Grid item xs={9}>
            <Routes>
              <Route
                path="/"
                element={
                  <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', height: '250%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Courier New, Courier, monospace' }}>
                        My Document
                      </Typography>
                      <Select
                        value={sortBy}
                        onChange={handleSortByChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Sort by' }}
                        sx={{ marginLeft: 3, width: 200, height: 40 }}
                      >
                        <MenuItem value="" disabled>
                          Sort by
                        </MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="size">Size</MenuItem>
                      </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 2, width: '90%' }}>
                      <DottedTextArea>
                      <UploadFileOutlined sx={{ marginRight: 1, color: 'primary.main' , fontSize:70}} />
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload">
                          <Button variant="contained" color="primary" component="span" sx={{ width: 200 }}>
                            Choose File
                          </Button>
                        </label>
                        {fileName && (
                          <Typography variant="body2" sx={{ marginTop: 1 }}>
                            Selected file: {fileName}
                          </Typography>
                        )}
                      </DottedTextArea>
                      <Box sx={{ display: 'flex', marginLeft: 4, justifyContent: 'center', width: '100%' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ marginTop: 2, width: 200, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
                          startIcon={<UploadFileIcon />}
                          onClick={vm.handleSubmit}
                        >
                          Submit File
                        </Button>
                      </Box>
                    </Box>

                    <Box sx={{ marginTop: 4 }}>
                      <FolderArea>
                        <Typography variant="body1">My Folders:</Typography>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                          <Typography variant="body1">Folder 1</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                          <Typography variant="body1">Folder 2</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                          <Typography variant="body1">Folder 3</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main' }} />
                          <Typography variant="body1">Folder 4</Typography>
                        </FolderItem>
                      </FolderArea>
                    </Box>
                  </Paper>
                }
              />
              <Route path="/folders" element={<FutureDevelopment />} />
              <Route path="/files" element={<FutureDevelopment />} />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
});
