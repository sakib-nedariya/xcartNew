import "./assets/css/main.css";
import HomeRoute from "./routes/client/HomeRoute";
import DashboardRoute from "./routes/admin/DashboardRoute";
import ToastMessage from "./pages/admin/layout/ToastMessage";

const App = () => {
  return (
    <>
      <ToastMessage />
      <HomeRoute />
      <DashboardRoute />
    </>
  );
};

export default App;
