import React, { useState, useEffect } from "react";
// import domJson from "./dom.json";
import { Editor, setSchemaTpl } from "amis-editor";
import { SchemaObject } from "amis";
import styles from "./index.module.scss";

function EditorComp(props: any) {
  const amisEditorRef = useRef(null);
  const [domsJson, setDomsJson] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [preview, setPreview] = useState(true);
  const [mask, setMask] = useState(false);
  const needSubmit = useRef(true);

  /**
   * 处理postmessage事件
   */
  const handlePostMessage = (event) => {
    if (!event) return false;
    if (event.data?.mask) {
      setMask(true);
    }
    if (event.data && event.data.action) {
      switch (event.data.action) {
        case "submit":
          needSubmit.current = false; // 不需要提交
          const btnRef = amisEditorRef.current?.mainRef.current
            .querySelector(".antd-Panel-footerWrap")
            .getElementsByTagName("button");
          btnRef[0] && btnRef[0]?.click();
          break;

        default:
          break;
      }
    } else if (event.data && event.data.businessNo) {
      getTempJson(event.data.name, event.data.businessNo);
    } else {
      getTempJson(event.data.name, "");
    }
  };
  /**
   * 获取模板内容
   * @param templateName 模板名称
   * @param businessNo 申请编号
   */
  const getTempJson = (templateName, businessNo) => {
    if (businessNo) {
      window.$api
        .getHasDataTemp({
          businessNo: businessNo,
        })
        .then((res: any) => {
          // 如果没有模板 重新获取空模板
          if (!res) {
            getTempJson(templateName, "");
            return false;
          }
          const amisTemplate = JSON.parse(res.amisJson);
          setDomsJson(amisTemplate);
          setMobile(false);
          setPreview(true);
          window.$DomsJson = {
            amisTemplate,
            id: res.id,
            templateNo: res.templateNo,
          };
          setLoading(false);
        });
    } else {
      window.$api
        .getTemp({
          templateName: templateName,
        })
        .then((res: any) => {
          const amisTemplate = JSON.parse(res[res.length - 1].amisTemplate);
          setDomsJson(amisTemplate);
          setMobile(false);
          setPreview(true);
          window.$DomsJson = {
            amisTemplate,
            templateNo: res[res.length - 1].id,
          };
          setLoading(false);
        });
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   // window.$DomsJson = domJson;
    //   // setDomsJson(domJson);
    // }, 1000);
  };

  /**
   * 提交表单内容
   * @param event 内容对象
   */
  const submitSave = (event) => {
    const domsJsonTemp = {
      ...JSON.parse(JSON.stringify(window.$DomsJson)),
      data: event.detail,
    };
    if (window.top != window) {
      window.parent.postMessage(
        {
          amisTemplate: domsJsonTemp,
          needSubmit: needSubmit.current,
        },
        "*"
      );
    }
    // setLoading(true)
    // 在这里处理接收到的表单数据
  };

  useEffect(() => {
    setLoading(true);
    if (window.top == window) {
      getTempJson("briefHistory", "");
    }
    window.addEventListener("message", handlePostMessage);
    window.addEventListener("formSubmit", submitSave);
    return () => {
      window.removeEventListener("formSubmit", submitSave, false);
      window.removeEventListener("message", handlePostMessage, false);
    };
  }, []);

  return (
    <>
      {loading || mobile ? (
        <p>加载中。。。</p>
      ) : (
        <div className={styles.main}>
          <Editor
            ref={amisEditorRef}
            {...props}
            isMobile={mobile}
            theme={"antd"}
            value={domsJson as SchemaObject}
            preview={preview}
          />
          {mask ? <div className={styles.main_mask}></div> : null}
        </div>
      )}
    </>
  );
}
export default EditorComp;
