import { makeAutoObservable } from "mobx";
import { PDFDocument, PDFField } from 'pdf-lib'

// PDF manipulation here
export class PDFReaderVM {

    pdfFile: File | undefined = undefined;
    textFields: ITextFields[] = [];


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    fileSubmitCallback(file: File) {
        console.log('file Submit Callback with file: ', file.name);
        this.pdfFile = file;
    }

    async handlePDFFormFields() {
        if (this.pdfFile === undefined) {
            return;
        }
        const pdfDoc = await PDFDocument.load(await this.pdfFile.arrayBuffer());
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        fields.forEach(field => {
            const type = field.constructor.name;
            const name = field.getName();
            let value = undefined;
            switch(type) {
                case 'PDFCheckBox':
                    value = this.valueFromCheckbox(field);
                    break;
                case 'PDFTextField':
                    value = this.valueFromText(field)
                    break;
                case 'PDFDropdown':
                    value = this.valueFromDropdown(field);
                    break;
            }
            console.log(`${type}: ${name}`);
          })
        return;
    }

    valueFromCheckbox(field: PDFField) {
        // const value = field.getText()
    }
    valueFromText(field: PDFField) {
        // field = 
    }
    valueFromDropdown(field: PDFField) {
        // field = 
    }

    // Quiz 1
    // async handleFormlessPDF() {
    //     if (this.pdfFile === undefined) {
    //         return;
    //     }
    //     const pdfDoc = await PDFDocument.load(await this.pdfFile.arrayBuffer());
    //     const form = pdfDoc.getForm();
    // }
}

interface ITextFields {
    name: 'string';
    value: any;
}