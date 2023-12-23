import { Tree, Dropdown, Modal, Input } from "antd";
import { useRef, useState } from "react";
import leftStyle from "./index.module.less";
import moreIcon from "../../../assets/more_icon.svg";
import icon from "../../../assets/add_icon.png";

const { DirectoryTree } = Tree;

const Left = ({
  setSelectedData,
  treeData,
  dispatch,
  setNode,
  selectedData,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [dropKey, setDropKey] = useState<string>("");
  const [expandedKeys, setExpandedKeys] = useState<string[]>(["0-0"]);
  const [selectedKeys,setSelectedKeys]=useState<string[]>(['0-0'])
  const inputValue = useRef<string>("");

  const items = [
    { label: "新建笔记本", key: "add" },
    { label: "重命名", key: "resetName" },
    { label: "删除", key: "delete" },
  ];
  const menuClick = (e:any, item:any, node:any) => {
    e.stopPropagation();
    if (item.key === "add") {
      inputValue.current = "";
      Modal.confirm({
        title: node?.isLeaf ? "笔记名称" : "笔记本名称",
        content: (
          <div>
            <Input
              onChange={(e) => {
                inputValue.current = e.target.value;
              }}
            />
          </div>
        ),
        okText: "确定",
        cancelText: "取消",
        onOk() {
          if (!node?.isLeaf) {
            dispatch({ type: "add", data: { text: inputValue.current, node } });
            setExpandedKeys([...expandedKeys, node.key]);
            return;
          }
          dispatch({
            type: "addData",
            data: { text: inputValue.current, node },
          });
          setSelectedData(node)
          setSelectedKeys([node.key])
        },
      });
    }
    if (item.key === "resetName") {
      inputValue.current = node.title;
      Modal.confirm({
        title: "重命名",
        content: (
          <div>
            <Input
              onChange={(e) => {
                inputValue.current = e.target.value;
              }}
            />
          </div>
        ),
        okText: "确定",
        cancelText: "取消",
        onOk() {
          dispatch({
            type: "resetName",
            data: { text: inputValue.current, node },
          });
        },
      });
    }
    if (item.key === "delete") {
      dispatch({ type: "delete", data: { node } });
    }
    setOpen(false);
  };
  const dropdownRender = (menus, node:any) => {
    return (
      <div className={leftStyle.menu}>
        {items.map((i) => {
          if (node.key == "0-0" && i.key == "delete") return;
          return (
            <div
              key={i.key}
              onClick={(e) => {
                menuClick(e, i, node);
              }}
            >
              {node?.isLeaf && i.key == "add" ? "新建笔记" : i.label}
            </div>
          );
        })}
      </div>
    );
  };

  const titleRender = (node) => {
    return (
      <div className={leftStyle.tree}>
        {node.title}
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          dropdownRender={(menus) => {
            return dropdownRender(menus, node);
          }}
          open={open && dropKey === node.key}
          onOpenChange={(open) => {
            setOpen(open);
          }}
        >
          <img
            src={moreIcon}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
              setDropKey(node.key);
            }}
          />
        </Dropdown>
      </div>
    );
  };
  const onSelect = (keys, data) => {
    setSelectedData(data.node);
    setSelectedKeys(keys);
    setNode([]);
  };
  const addTree = () => {
    Modal.confirm({
      title:selectedData?.isLeaf? "新增笔记":'新增笔记本',
      content: (
        <div>
          <Input
            onChange={(e) => {
              inputValue.current = e.target.value;
            }}
          />
        </div>
      ),
      okText: "确定",
      cancelText: "取消",
      onOk() {
        if (!selectedData?.isLeaf) {
          dispatch({
            type: "add",
            data: {
              text: inputValue.current,
              node: !selectedData?.key ? { key: "0-0" } : selectedData,
            },
          });
          setExpandedKeys([...expandedKeys, selectedData?.key]);
          return
        }
        dispatch({
            type: "addData",
            data: {
              text: inputValue.current,
              node: !selectedData?.key ? { key: "0-0" } : selectedData,
            },
          });

      },
    });
  };
  return (
    <div className={leftStyle.left}>
      <div className={leftStyle.header} onClick={addTree}>
        <img src={icon} />
        <span>{selectedData?.isLeaf ? "新建笔记" : "新建笔记本"}</span>
      </div>
      <DirectoryTree
        multiple
        defaultExpandAll
        defaultSelectedKeys={["0-0"]}
        expandedKeys={expandedKeys}
        titleRender={titleRender}
        treeData={treeData}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
      />
    </div>
  );
};
export default Left;
