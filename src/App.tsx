import React, { useEffect } from "react";
import {
  HashRouter,
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { AllRouters as routes } from "./router/index";
import DefaultLayout from "./layout/Default";
import api from "@/api";
// 以下样式均生效
import "amis/lib/themes/default.css";
import "amis/lib/helper.css";
import "amis/sdk/iconfont.css";
import "amis-editor-core/lib/style.css";
import "amis-ui/lib/themes/antd.css";

declare global {
  interface Window {
    $api: any;
    $DomsJson: any;
  }
}
/* 
  设置全局变量
*/
window.$api = { ...api };

function App() {
  // useEffect(() => {
  //   console.log(111111111, window.self !== window.top);
  //   const handleMessage = (event: any) => {
  //     console.log(event, "event----------");
  //   };
  //   window.addEventListener("message", handleMessage, false);

  //   return () => {
  //     window.removeEventListener("message", handleMessage, false);
  //   };
  // }, []);
  return (
    <BrowserRouter basename="/AmisUtils">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/:notFoundPath" element={<Navigate to="/404" />}></Route>
        {routes.map((e: any) => {
          return (
            <Route
              key={e.key}
              path={e.path}
              element={
                <DefaultLayout>
                  <e.component />
                </DefaultLayout>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
