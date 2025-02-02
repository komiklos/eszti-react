import React, { Component } from "react";
import ImageUploader from '../../components/ImageUploader';
import ImageUpload from '../../components/ImageUploader';

export default class About extends Component {
  render() {
    return (
        <div>
          <h1>Image Upload</h1>
          <ImageUpload />
        </div>
    );
  }
}
