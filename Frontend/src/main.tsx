import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Page_City_List from "./pages/city_list/city_list.tsx";
import Page_404 from "./pages/_404/_404.tsx";
import Page_City_Info from "./pages/city_info/city_info.tsx";
import Page_City_Search from "./pages/city_search/city_search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page_City_List />,
  },
  {
    path: "/weather",
    element: <Page_City_Info/>,
  },
  {
    path: "/search",
    element: <Page_City_Search/>,
  },
  {
    path: "*",
    element: <Page_404/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
