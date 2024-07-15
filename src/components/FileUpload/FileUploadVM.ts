import { isObservable, makeAutoObservable } from "mobx"

export class FileUploadVM {
    pdfFile: any = undefined;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        console.log(isObservable(this))
    }

    handleFileChange(event: any) {
        this.pdfFile = event.target.files[0];
    }
}