import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from '@material-ui/core';

class AddArticle extends Component {
  handleEditorChange = e => {
    console.log('Content was updated:', e.target.getContent());
  };

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel required htmlFor="my-input">
            Title
          </InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
          <Editor
            apiKey="zgthisp1lypefx3m431mxa9bc5gwjaxv7bhv5bbhu4vi1m25"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
            }}
            onChange={this.handleEditorChange}
          />
        </FormControl>
      </div>
    );
  }
}

export default AddArticle;
