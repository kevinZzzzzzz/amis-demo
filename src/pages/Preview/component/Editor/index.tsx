import React, { useState, useEffect } from "react";
import domJson from "./dom.json";
import { Editor, setSchemaTpl } from "amis-editor";

function EditorComp(props: any) {
  const [domsJson, setDomsJson] = useState(domJson);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // console.log(111111111, window.self !== window.top);
    // const handleMessage = (event: any) => {
    //   console.log(event, "event----------");
    //   console.log(domJson, "domJson----------");
    //   domJson.data = event.data.data;
    //   setDomsJson(domJson);
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 2000);
    // };
    // window.addEventListener("message", handleMessage, false);
    setLoading(false);

    return () => {
      // window.removeEventListener("message", handleMessage, false);
    };
  }, []);
  return (
    <>
      {loading ? (
        <p>加载中。。。</p>
      ) : (
        <Editor theme={"cxd"} value={domsJson} preview {...props} />
      )}
    </>
  );
}
export default EditorComp;
