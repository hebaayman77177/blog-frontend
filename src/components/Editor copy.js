import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';


const Editor = ({ handleChange }) => {
  return (
    <div className="App">
      <CKEditor
        editor={ClassicEditor}

        // onReady={(editor) => {
        //   console.log("Editor is ready to use!", editor);
        // }}

        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   console.log({ event, editor, data });
        // }}

        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}

        onBlur={(event, editor) => {
          console.log(editor.getData())
          handleChange(editor.getData());
        }}
        
      />
    </div>
  );
};

export default Editor;
