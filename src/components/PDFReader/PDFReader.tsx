import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import {PDFReaderVM} from './PDFReaderVM'


const PDFReaderComponent = () => {
    const vm = useRef(new PDFReaderVM).current;
    return(
        <div>
            <FileUpload fileCallback={vm.fileSubmitCallback}/>
        </div>
    )
}

export const PDFReader = observer(PDFReaderComponent);