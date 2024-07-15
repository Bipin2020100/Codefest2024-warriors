import { makeAutoObservable } from "mobx";
import { PDFDocument, PDFField, PDFForm } from "pdf-lib";

// PDF manipulation here
export class PDFReaderVM {
  pdfFile: File | undefined = undefined;
  inputFields: IInputFields[] = [];


  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  fileSubmitCallback(file: File) {
    console.log("file Submit Callback with file: ", file.name);
    this.pdfFile = file;
  }

  async handlePDFFormFields() {
    if (this.pdfFile === undefined) {
      return;
    }
    const pdfDoc = await PDFDocument.load(await this.pdfFile.arrayBuffer());
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    this.inputFields = [];
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      let value: any = undefined;
      switch (type) {
        case "PDFCheckBox":
          value = this.valueFromCheckbox(form, name);
          break;
        case "PDFTextField":
          value = this.valueFromText(form, name);
          break;
        case "PDFDropdown":
          value = this.valueFromDropdown(form, name);
          break;
      }
      this.inputFields.push({
        name: name,
        vName: name.replace('\t', ''),
        type: type,
        value: value
      })
    });
    console.log(JSON.parse(JSON.stringify({data: this.inputFields})))
  }

  valueFromCheckbox(form: PDFForm, name: string) {
    // const value = field.getText()
    const value = form.getCheckBox(name).isChecked();
    return value;
  }
  valueFromText(form: PDFForm, name: string) {
    const value = form.getTextField(name).getText();
    return value;
  }
  valueFromDropdown(form: PDFForm, name: string) {
    // field =
    const value = form.getDropdown(name).getSelected();
    return value;
  }
}

interface IInputFields {
  name: string;
  vName: string;
  type: string;
  value: string | number | boolean;
}
