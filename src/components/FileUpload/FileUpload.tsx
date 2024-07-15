import { observer } from "mobx-react";
import { FileUploadVM, IFileUploadProps } from "./FileUploadVM";
import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const DottedTextArea = styled('div')(({ theme }) => ({
  border: '2px dotted lightgrey',
  backgroundColor: '#ffffff',
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
  height: '180px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
}));

export const FileUpload = observer((props: IFileUploadProps & { sx?: any }) => {
  const vm = useRef(new FileUploadVM(props)).current;
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      vm.handleFileChange(event);
    }
  };

  return (
    <Box sx={{ ...props.sx, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 2, width: '90%' }}>
      <DottedTextArea>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload">
          <Box>
          <UploadFileIcon sx={{ marginRight: 1, color: 'primary.main', fontSize: 80, marginBottom: 1}} />
          </Box>
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
  );
});
