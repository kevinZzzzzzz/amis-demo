import React, { useState, useEffect } from "react";
import domJson from "./dom.json";
import { Editor, setSchemaTpl } from "amis-editor";

function EditorComp(props: any) {
  return (
    <>
      <Editor theme={"cxd"} value={domJson} preview {...props} />
    </>
  );
}
export default EditorComp;
