import ReactQuill from "react-quill";
import { Empty } from "antd";
import { memo, useEffect, useState } from "react";
import deleteIcon from "../../../assets/delete.svg";
import saveIcon from "../../../assets/save.svg";
import "react-quill/dist/quill.snow.css";
import editStyle from "./index.module.less";

const Edit = ({ node, dispatch, selectedData, setNode }) => {
  const [value, setValue] = useState<any>(node?.html);
  const [html, setHtml] = useState<any>(node?.html);
  const [text, setText] = useState<any>(node?.text);
  useEffect(() => {
    setValue(node?.text??'');
  }, [node]);
  const onchange = (content, delta, source, editor) => {
    setValue(content);
    setHtml(editor.getHTML());
    setText(editor.getText());
  };
  const update = (type) => {
    if (type === "del") {
      setValue("");
      setHtml("");
      setText("");
      dispatch({
        type: "update",
        data: {
          node: selectedData,
          children: node,
          text: "",
          html: "",
          name: "delete",
        },
      });
      setNode([]);
    } else {
      dispatch({
        type: "update",
        data: {
          node: selectedData,
          children: node,
          text,
          html,
          name: "update",
        },
      });
    }
  };
  if (Object.keys(node) == 0) {
    return (
      <div className={editStyle.Empty}>
        <Empty description={<>这里没有笔记哦~</>} />
      </div>
    );
  }
  return (
    <div className={editStyle.edit}>
      <div className={editStyle.header}>
        <div>{node.title}</div>
        <div>
          <div
            onClick={() => {
              update("del");
            }}
          >
            <img src={deleteIcon} />
            <span>删除</span>
          </div>
          <div
            onClick={() => {
              update("save");
            }}
          >
            <img src={saveIcon} />
            <span>保存</span>
          </div>
        </div>
      </div>
      <div className={editStyle.quill}>
        <ReactQuill
          style={{ height: "100%" }}
          onChange={onchange}
          value={value}
        />
      </div>
    </div>
  );
};
export default memo(Edit);
