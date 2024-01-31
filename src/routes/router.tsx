import Dashboard from "../components/dashboard/dashboard";
import Connect from "../components/connect/connect";
import Invitation from "../components/invitation/invitation";
import Profile from "../components/profile/profile";

const router = [
    {
      path: "/",
      element: <Connect />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/invitation",
      element: <Invitation />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
];

export default router;