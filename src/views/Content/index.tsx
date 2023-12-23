import { useState } from "react";
import Left from "./Left/index.tsx";
import Preview from "./Preview/index.tsx";
import Edit from "./Edit/index.tsx";
import {
  updateData,
  updateName,
  addNode,
  deleteNode,
  addData,
} from "../../utils/model.js";
import contentStyle from "./index.module.less";

const Content = () => {
  const [selectedData, setSelectedData] = useState<any>({});
  const [node, setNode] = useState<any>([]);
  const [treeData, setTreeData] = useState<any>([
    {
      title: "我的笔记",
      key: "0-0",
    },
  ]);

  const dispatch = ({ type, data }:{type:string,data:any}) => {
    const { node = [], text = "", html = "", children = {}, name = "" } = data;
    if (type === "add") {
      // 添加子节点
      const newTreeData = [...treeData];
      const data = addNode(node.key, newTreeData, text, false);
      setTreeData(data);
    }
    // 添加笔记
    if (type == "addData") {
      const newTreeData = [...treeData];
      const data = addData(node.key, newTreeData, text);
      setTreeData(data);
    }
    // 重命名节点
    if (type === "resetName") {
      const newTreeData = [...treeData];
      const data = updateName(node.key, newTreeData, text);
      setTreeData(data);
    }
    // 删除节点
    if (type === "delete") {
      const newTreeData = [...treeData];
      const data = deleteNode(node.key, newTreeData);
      setTreeData(data);
    }
    // 更新节点内容
    if (type === "update") {
      const newTreeData = [...treeData];
      const data = updateData(
        node.key,
        newTreeData,
        children,
        text,
        html,
        name
      );
      setTreeData(data);
    }
  };
  return (
    <div className={contentStyle.content}>
      <Left
        setSelectedData={setSelectedData}
        treeData={treeData}
        dispatch={dispatch}
        setNode={setNode}
        selectedData={selectedData}
      />
      <Preview
        selectedData={selectedData}
        setNode={setNode}
        node={node}
        treeData={treeData}
      />
      <Edit
        node={node}
        dispatch={dispatch}
        selectedData={selectedData}
        setNode={setNode}
      />
    </div>
  );
};
export default Content;
