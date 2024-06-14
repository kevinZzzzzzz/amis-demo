import React, { useState, useEffect } from "react";
import domJson from "./dom.json";
import { Editor, setSchemaTpl } from "amis-editor";

function EditorComp(props: any) {
  const [domsJson, setDomsJson] = useState({});
  const [loading, setLoading] = useState(true);
  /**
   * 获取模板内容
   * @param name 模板名称
   */
  const getTempJson = (event) => {
    window.$api
      .getTemp({
        templateName: (event.data && event.data.name) || event,
      })
      .then((res: any) => {
        const amisTemplate = JSON.parse(res[res.length - 1].amisTemplate);
        setDomsJson(amisTemplate);
        window.$DomsJson = {
          amisTemplate,
          id: res[res.length - 1].id,
        };
        setLoading(false);
      });
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
    console.log(domsJsonTemp, "domsJsonTemp");
    if (window.top != window) {
      window.parent.postMessage(
        {
          amisTemplate: domsJsonTemp,
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
      getTempJson("briefHistory");
    }
    window.addEventListener("message", getTempJson);
    window.addEventListener("formSubmit", submitSave);
    return () => {
      window.removeEventListener("formSubmit", submitSave, false);
      window.removeEventListener("message", getTempJson, false);
    };
  }, []);

  return (
    <>
      {loading ? (
        <p>加载中。。。</p>
      ) : (
        <Editor
          theme={"cxd"}
          isMobile={false}
          value={domsJson}
          preview
          {...props}
        />
      )}
    </>
  );
}
export default EditorComp;
