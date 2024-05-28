import { lazy } from "react";

interface RouterInterface {
  key: number;
  name: string;
  path: string;
  component: any;
  children?: any[];
}

const HomePage: RouterInterface = {
  key: 0,
  name: "Home",
  path: "/home",
  component: lazy(
    () => import(/* webpackChunkName: "home" */ "@/pages/Home/index")
  ),
  children: [],
};
const EditPage: RouterInterface = {
  key: 1,
  name: "Edit",
  path: "/edit",
  component: lazy(
    () => import(/* webpackChunkName: "edit" */ "@/pages/Edit/index")
  ),
  children: [],
};
const PreviewPage: RouterInterface = {
  key: 2,
  name: "preview",
  path: "/preview",
  component: lazy(
    () => import(/* webpackChunkName: "preview" */ "@/pages/Preview/index")
  ),
  children: [],
};
const NotFoundPage: RouterInterface = {
  key: 100,
  name: "NotFound",
  path: "/404",
  component: lazy(
    () => import(/* webpackChunkName: "404" */ "@/pages/404/index")
  ),
  children: [],
};

const AllRouters: RouterInterface[] = [
  HomePage,
  EditPage,
  PreviewPage,
  NotFoundPage,
];

export { AllRouters };
