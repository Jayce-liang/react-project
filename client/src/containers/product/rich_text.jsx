import React, { PureComponent } from "react";
import { EditorState, convertToRaw,ContentState} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class EditorConvertToHTML extends PureComponent {
  state = {
    editorState: EditorState.createEmpty(),
  };

  getRichText = () => {
    return draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
  };

  setRichText = (HTML) => {
    const contentBlock = htmlToDraft(HTML);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.getRichText();
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          // editorClassName="demo-editor"
          editorStyle={{
            border: "1px solid black",
            minHeight: "200px",
            lineHeight: "16px",
            paddingLeft: "5px",
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
