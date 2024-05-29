import { useState } from "react";
import { Editor, setSchemaTpl } from "amis-editor";
import type { SchemaObject } from "amis";
import { render as renderAmis } from "amis";
import type { Schema } from "amis/lib/types";
import "./index.scss";
import domJson from "./dom.json";
type Props = {
  defaultPageConfig?: Schema;
  codeGenHandler?: (codeObject: Schema) => void;
  pageChangeHandler?: (codeObject: Schema) => void;
  cancleGenHandler?: () => void;
};

export function Amis(props: Props) {
  const [mobile, setMobile] = useState(false);
  const [preview, setPreview] = useState(false);
  const [defaultPageConfig] = useState<Schema>(props.defaultPageConfig); // 传入配置
  const defaultSchema: Schema | SchemaObject = defaultPageConfig ||
    domJson || {
      type: "page",
      body: "",
      title: "标题",
      regions: ["body"],
    };
  const [schema] = useState(defaultSchema);
  let pageJsonObj: Schema = defaultSchema;
  const onChange = (value: Schema) => {
    pageJsonObj = value;
    console.log(value, "value------------");
    props.pageChangeHandler && props.pageChangeHandler(value);
  };
  const onSave = () => {
    console.log(pageJsonObj, "pageJsonObj=--------");
    props.codeGenHandler && props.codeGenHandler(pageJsonObj);
  };
  return (
    <>
      {renderAmis({
        type: "form",
        mode: "inline",
        title: "",
        style: {
          padding: "0px 0px 0px 0px",
          margin: "0px 0px 0px 0px",
          position: "sticky",
          top: "0px",
          zIndex: 1000,
        },
        body: [
          {
            name: "preview",
            type: "button",
            label: "预览",
            level: "default",
            style: {
              margin: "0px 10px 0px 0px",
            },
            onClick: function (v: any) {
              setPreview((v) => !v);
            },
          },
          // {
          //   type: "switch",
          //   option: "移动端",
          //   name: "mobile",
          //   style: {
          //     margin: "0px 10px 0px 0px",
          //   },
          //   onChange: function (v: any) {
          //     setMobile(v);
          //   },
          // },
          {
            type: "button",
            label: "保存",
            level: "primary",
            style: {
              margin: "0px",
            },
            onClick: function () {
              onSave();
            },
          },
          // {
          //   type: "button",
          //   label: "退出",
          //   level: "danger",
          //   onClick: function () {
          //     // if (!window.confirm('确定退出?')) return;
          //     if (props.cancleGenHandler) props.cancleGenHandler();
          //   },
          // },
        ],
      })}
      <Editor
        preview={preview}
        isMobile={mobile}
        onChange={onChange}
        value={schema as SchemaObject}
        theme={"antd"}
        onSave={onSave}
      />
    </>
  );
}

export default Amis;
