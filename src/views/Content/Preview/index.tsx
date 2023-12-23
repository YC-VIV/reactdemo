import { Input, Empty } from "antd";
import { useState, useEffect, useMemo } from "react";
import previewStyle from "./index.module.less";
import { getData } from "../../../utils/model";

const Preview = ({
  selectedData,
  setNode,
  node,
  treeData,
}: {
  selectedData: any;
  setNode: any;
  node: any;
  treeData: any;
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const newData = getData(selectedData?.key, treeData);
    setData(newData?.data ?? []);
    return;
  }, [selectedData, treeData]);
  const onChange = () => {
    if (!e.target.value) {
      const newData = getData(selectedData?.key, treeData);
      setData(newData?.data ?? []);
      return;
    }
    const newData = data.filter((i) => i?.title?.includes(e.target.value));
    setData(newData);
  };
  const contentRender = useMemo(() => {
    return (
      <>
        {data.map((i) => {
          return (
            <div
              key={i.title}
              className={`${previewStyle.previewContent} ${
                node?.key == i.key ? previewStyle.active : "item"
              }`}
              onClick={() => {
                setNode(i);
              }}
            >
              <div className={previewStyle.title}>{i.title}</div>
              <div className={previewStyle.text}>{i?.text}</div>
            </div>
          );
        })}
      </>
    );
  }, [data,selectedData,treeData,node]);

  return (
    <div className={previewStyle.preview}>
      <div className={previewStyle.header}>
        <Input placeholder="搜索笔记" onChange={onChange} />
      </div>
      {data.length > 0 ? (
        <div className={!data?.length && previewStyle.content}>
          {contentRender}
          {data.length > 0 && (
            <div className={previewStyle.footer}>总共{data.length}条</div>
          )}
        </div>
      ) : (
        <div className={previewStyle.Empty}>
          <Empty description={<>这里没有笔记哦~</>} />
        </div>
      )}
    </div>
  );
};
export default Preview;
