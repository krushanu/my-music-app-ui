import { Outlet } from "react-router-dom";
import QueryWrapper from "../util/QueryWrapper";

const Layout = () => {
  return (
    <QueryWrapper>
      <Outlet />
    </QueryWrapper>
  )
};

export default Layout;

