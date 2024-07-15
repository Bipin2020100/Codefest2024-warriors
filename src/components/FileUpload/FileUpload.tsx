import { observer } from "mobx-react";
import React, { useRef } from "react";
import { FileUploadVM } from "./FileUploadVM";

export const FileUpload = observer(() => {
  const vm = useRef(new FileUploadVM()).current;
  return (
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
  );
});
