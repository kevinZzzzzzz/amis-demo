import renderApp from "@/main";
import React, { useState, useEffect, useRef } from "react";
import EditorComp from "./component/Editor";
function PreviewPage(props: any) {
  return (
    <>
      <EditorComp />
    </>
  );
}
renderApp(PreviewPage);
export default PreviewPage;
