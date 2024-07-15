import { observer } from "mobx-react";
import React, { useRef } from "react";
import { FileUploadVM, IFileUploadProps } from "./FileUploadVM";

export const FileUpload = observer((props: IFileUploadProps) => {
  const vm = useRef(new FileUploadVM(props)).current;
  return (
    <form className="file-upload-form" onSubmit={vm.handleSubmit}>
      <div className="file-up-area">
        <label className="file-label" htmlFor="file-upload">
          Upload a PDF file:
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept=".pdf"
          onChange={vm.handleFileChange}
        />
      </div>
      <button type="submit">Submit File</button>
    </form>
  );
});
