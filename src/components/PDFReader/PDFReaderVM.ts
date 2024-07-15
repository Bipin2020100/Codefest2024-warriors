import { makeAutoObservable } from "mobx";

// PDF manipulation here
export class PDFReaderVM {

    pdfFile: any;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    fileSubmitCallback(file: any) {
        console.log('file Submit Callback with file: ', file.name);
    }
}