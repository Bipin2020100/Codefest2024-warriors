import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import {PDFReaderVM} from './PDFReaderVM'


const PDFReaderComponent = () => {
    const vm = useRef(new PDFReaderVM).current;
    return(
        <div>
            <FileUpload fileCallback={vm.fileSubmitCallback}/>
            <button onClick={vm.handlePDFFormFields} disabled={vm.pdfFile === undefined}>Handle PDF with Form Fields</button>
            {/* <button onClick={vm.handleFormlessPDF} disabled={vm.pdfFile === undefined}>Handle PDF</button> */}
            
        </div>
    )
}

export const PDFReader = observer(PDFReaderComponent);