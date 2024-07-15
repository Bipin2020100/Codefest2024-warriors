import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FileUpload } from './components/FileUpload/FileUpload';
import { PDFReader } from './components/PDFReader/PDFReader';

function App() {
  return (
    <div className="App">
      <PDFReader />
    </div>
  );
}

export default App;
