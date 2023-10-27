import { useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../features/userSlice";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import getTokenAPI from "../../../utils/HandleAPI/RefreshAPI";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getTokenAccess() {
      const data = await getTokenAPI();
      if (data?.accessToken) {
        dispatch(setCurrentUser(data.accessToken));
      }
    }
    getTokenAccess();
  }, [dispatch]);
  return (
    <Container>
      <Header className="header" />
      <div className="content">
        <Outlet />
      </div>
      <Footer className="footer" />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .header {
    flex: 0;
  }
  .content {
    flex: 1;
  }
  .footer {
    flex: 0;
  }
`;
export default Layout;
