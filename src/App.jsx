import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import Root from "./pages/Root";
import ForgotPassword from "./pages/ForgotPassword";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
