/*
 * @author: 林俊贤
 * @Date: 2022-08-15 14:50:02
 * @LastEditors: 林俊贤
 * @LastEditTime: 2022-08-16 16:42:23
 * @Description: 富文本编辑器
 */
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function NewEditor(props) {
  const { getContent, content } = props;

  const [editorState, setEditorState] = useState("");
  useEffect(() => {
    if (!content) return;

    const contentBlock = htmlToDraft(content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [content]);
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(value) => {
          setEditorState(value);
        }}
        onBlur={() => {
          getContent(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
          );
        }}
      />
    </div>
  );
}

export default NewEditor;
