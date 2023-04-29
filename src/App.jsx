import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import UpdateProfile from "./pages/UpdateProfile";
import UserProvider from "./store/UserProvider";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth", element: <Auth /> },
      { path: "/update-profile", element: <UpdateProfile /> },
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );

  // const [isAuth, setIsAuth] = useState(false);
  // function login() {
  //   setIsAuth(true);
  // }
  // return <>{isAuth ? <Home /> : <Auth login={login} />}</>;
}
