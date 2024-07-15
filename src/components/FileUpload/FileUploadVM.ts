import { isObservable, makeAutoObservable } from "mobx"

export interface IFileUploadProps {
    fileCallback: (file: File) => void;
}

// Just the form for uploading files
export class FileUploadVM {
    pdfFile: File | undefined = undefined;
    props: IFileUploadProps;
    constructor(props: IFileUploadProps) {
        makeAutoObservable(this, {}, { autoBind: true })
        console.log(isObservable(this))
        this.props = props;
    }

    handleFileChange(event: any) {
        this.pdfFile = event.target.files[0];
    }
    
    handleSubmit(event: any) {
        event.stopPropagation();
        event.preventDefault();
        if (this.pdfFile === undefined) {
            console.log('No File Submitted')
        }
        else {
            console.log(`submitted file - ${this.pdfFile.name}`);
            this.props.fileCallback(this.pdfFile);
        }
    }
}