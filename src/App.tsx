import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Grid, Paper, MenuItem, Select, Box } from '@mui/material';
import { Search as SearchIcon, Folder as FolderIcon, Dashboard as DashboardIcon, FolderOpen as FolderOpenIcon, InsertDriveFile as InsertDriveFileIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { PDFReader } from './components/PDFReader/PDFReader';
import ConstructionIcon from '@mui/icons-material/Construction';

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
  <Box sx={{ padding: 4, textAlign: 'center' }}>
    <ConstructionIcon sx={{ fontSize: 80, color: 'grey.500', marginBottom: 2 }} />
    <Typography variant="h4">Future Development: Work in Progress</Typography>
  </Box>
);

const App = () => {
  const [sortBy, setSortBy] = useState('');

  const handleSortByChange = (event: any) => {
    setSortBy(event.target.value);
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
              <DashboardIcon sx={{ marginRight: 1, fontSize: 40 }} />
              <Typography variant="h6">Dashboard</Typography>
            </NavItem>
            <NavItem to="/folders">
              <FolderOpenIcon sx={{ marginRight: 1, fontSize: 40 }} />
              <Typography variant="h6">Folders</Typography>
            </NavItem>
            <NavItem to="/files">
              <InsertDriveFileIcon sx={{ marginRight: 1, fontSize: 40 }} />
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
                    <PDFReader />
                    <Box sx={{ marginTop: 4 }}>
                      <FolderArea>
                        <Typography variant="body1">My Folders:</Typography>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main', fontSize: 40 }} />
                          <Typography variant="body1">Folder 1</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main', fontSize: 40 }} />
                          <Typography variant="body1">Folder 2</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main', fontSize: 40 }} />
                          <Typography variant="body1">Folder 3</Typography>
                        </FolderItem>
                        <FolderItem>
                          <FolderIcon sx={{ marginRight: 1, color: 'primary.main', fontSize: 40 }} />
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
}

export default App;
