import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getHostRequestDetails } from "../../../features/adminSlice";
import { selectAllUsers } from "../../../features/userSlice";
import formatDateTime from "../../../utils/functions/formatDateTime";
function HostRequestTable() {
  let requestsData = useSelector(getHostRequestDetails);
  const allUsers = useSelector(selectAllUsers);
  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Reason for decline",
      selector: (row) => row.reasonForDecline,
      hide: "md",
    },
    {
      name: "Requested on",
      selector: (row) => row.requestedOn,
      width: "12rem",
    },
  ];
  const data =
    requestsData &&
    requestsData.map((request) => {
      return {
        username: allUsers.find((user) => user.userId === request.userId)
          ?.fullName,
        status: request.status,
        reasonForDecline: request.reasonForDecline || "No reason provided",
        requestedOn: formatDateTime(new Date(request.requestedOn)),
      };
    });
  const customStyles = {
    rows: {
      style: {
        minHeight: "2rem",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        textAlign: "center",
      },
    },
  };
  const ExpandedComponent = ({ data }) => {
    return (
      <div className="coupon">
        <div className="left-column">
          <div className="coupon-code">
            <p>Username:</p> {data.username}
          </div>
          <div className="coupon-type">
            <p>Status:</p> {data.status}
          </div>
        </div>
        <div className="right-column">
          <div className="coupon-expiry">
            <p>Requested On:</p> {data.requestedOn}
          </div>
          <div className="coupon-includes">
            <p>Reason:</p> {data.reasonForDecline}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover={true}
        customStyles={customStyles}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: max-content;
  align-self: center;
  & > *::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 0.5rem;
    }
  }
`;

export default HostRequestTable;
