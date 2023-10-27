import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HostRequestTable from "./HostRequestTable";
import { useDispatch, useSelector } from "react-redux";
import PopRespondRequest from "./PopRespondRequest";
import { ToastContainer, toast } from "react-toastify";
import { getHostRequestDetails } from "../../../features/adminSlice";
function HostRequest() {
  let requestsData = useSelector(getHostRequestDetails);
  const [showRequest, setShowRequest] = useState(false);
  const handleRespond = () => {
    setShowRequest(!showRequest);
  };
  return (
    <Container>
      <div className="header">
        <h2>Host Request</h2>
        <Link className="positive-button" onClick={handleRespond}>
          Show Request
        </Link>
        {showRequest && <PopRespondRequest handleRespond={handleRespond} />}
      </div>
      <section>
        <header>
         {requestsData &&  <div className="counts">
            <p>All({requestsData.length})</p>
            <p>|</p>
            <p>
              Accepted(
              {
                requestsData && requestsData.filter((req) => req.status.includes("Accepted"))
                  .length
              }
              )
            </p>
            <p>|</p>
            <p>
              Pending(
              {
                requestsData && requestsData.filter((req) => req.status.includes("Pending"))
                  .length
              }
              )
            </p>
          </div>}
          <div className="search">
            <input type="text" placeholder="Search" />
            <button className="positive-button">Search Request</button>
          </div>
        </header>
        <HostRequestTable />
      </section>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  height: 100%;
  border-radius: 0.25rem;
  gap: 1rem;
  padding: 1rem;
  .header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .counts,
      .search {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
  @media screen and (max-width: 575px) {
    section {
      header {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;

export default HostRequest;
