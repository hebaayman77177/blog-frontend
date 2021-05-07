import React from "react";
import dynamic from "next/dynamic";
import Box from "@material-ui/core/Box";
import axios from "../axios";
import "../../node_modules/react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { editorHtml: props.initPost };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.handleClickOutsideEditor(this.state.editorHtml);
    }
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  imageHandler() {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      // Insert temporary loading placeholder image
      this.quill.insertEmbed(
        range.index,
        "image",
        `${window.location.origin}/images/loaders/placeholder.gif`
      );

      // Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);
      function apiPostNewsImage(formData) {
        return (async () => {
          const res = await axios.post("/blogs/upload-img", formData);
          return res.data.data.imgPath;
        })();
      }
      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, "image", res);
    };
  }

  render() {
    return (
      <Box ref={this.setWrapperRef}>
        <div className="text-editor">
          <ReactQuill
            value={this.state.editorHtml}
            ref={(el) => {
              this.quill = el;
            }}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            modules={{
              toolbar: {
                container: [
                  [
                    { header: "1" },
                    { header: "2" },
                    { header: [3, 4, 5, 6] },
                    { font: [] },
                  ],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "video"],
                  ["link", "image", "video"],
                  ["clean"],
                  ["code-block"],
                ],
                handlers: {
                  image: this.imageHandler,
                },
              },
            }}
          />
        </div>
      </Box>
    );
  }
}

export default Editor;
