import React, { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  toastOptionSuccess,
  toastOptionError,
} from "../../../utils/functions/toastOptions";
import {
  acceptHostRequest,
  getHostRequestDetails,
  getAdminDataStatus,
  getAdminDataErr,
} from "../../../features/adminSlice";
import { getUserDetailsById } from "../../../features/userSlice";
import formatDateTime from "../../../utils/functions/formatDateTime";
import emailjs from "emailjs-com";
const PopRespondRequest = ({ handleRespond }) => {
  const dispatch = useDispatch();
  const adminDataStatus = useSelector(getAdminDataStatus);
  const adminDataErr = useSelector(getAdminDataErr);
  const options = [
    { value: "Accepted", label: "Accept" },
    { value: "Rejected", label: "Reject" },
  ];
  let requestsData = useSelector(getHostRequestDetails);
  requestsData = requestsData.filter((req) => req.status === "Pending");
  const RequestCard = ({ request }) => {
    const user = useSelector((state) =>
      getUserDetailsById(state, request?.userId)
    );
    console.log(request)
    const [statusForRequest, setStatusForRequest] = useState();
    const [showDetail, setShowDetail] = useState(false);
    const [reason, setReason] = useState("");
    const handleResponse = (e) => {
      if (statusForRequest) {
        dispatch(
          acceptHostRequest({
            userId: request.userId,
            reasonForDecline: reason,
            requestId: request.requestId,
            statusForRequest: statusForRequest,
          })
        );
        if (adminDataStatus === "rejected") {
          toast.error(adminDataErr, toastOptionError);
        }
        if (adminDataStatus === "fulfilled") {
          toast.success("Request responded", toastOptionSuccess);
        }
        const template = {
          user_name: user.fullName,
          request_id: request.requestId,
          status: statusForRequest,
          reason: reason || "No reason specified",
          to_mail: user.email,
        };
        emailjs.send(
          "service_vhv0zar",
          "template_tx3peza",
          template,
          "uhK_AVg0bCtGj-ygf"
        );
        setShowDetail(!showDetail);
      }
    };
    return (
      <div className="request-card">
        <Link>
          <div className="img-name">
            <img src={user?.userProfilePic}></img>
            <div className="details">
              <h5>{user?.fullName}</h5>
              <p>{user?.email}</p>
              <p className="request-date">
                Request on {formatDateTime(new Date(request?.requestedOn))}
              </p>
            </div>
            {!showDetail && (
              <FaAngleRight onClick={() => setShowDetail(!showDetail)} />
            )}
            {showDetail && (
              <FaAngleDown onClick={() => setShowDetail(!showDetail)} />
            )}
          </div>
        </Link>
        {showDetail && (
          <>
            <Select
              options={options}
              placeholder="Response"
              onChange={(option) => setStatusForRequest(option.value)}
            />
            {statusForRequest === "Rejected" && (
              <textarea
                type="text"
                placeholder="Reason for decline"
                rows={5}
                style={{ resize: "none" }}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            )}
            <button className="positive-button" onClick={handleResponse}>
              Submit
            </button>
          </>
        )}
        <ToastContainer />
      </div>
    );
  };
  return (
    <Container>
      <div className="popup-content">
        <AiOutlineClose className="close-btn" onClick={handleRespond} />
        <h3>Respond to Request</h3>
        <main>
          <div className="requests-list">
            {requestsData &&
              requestsData.map((request) => (
                <RequestCard key={request.requestId} request={request} />
              ))}
            {(!requestsData || requestsData.length === 0) && (
              <h5>No requests found</h5>
            )}
          </div>
        </main>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    max-height: 25rem;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    &::-webkit-scrollbar {
      width: 0.25rem;
      &-thumb {
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.5rem;
      }
    }
    h5 {
      align-self: center;
    }
    h3 {
      align-self: center;
      color: rgb(40, 167, 69);
      margin-top: 1rem;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    & > main {
      .requests-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        .request-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          gap: 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid #ccc;
          .img-name {
            display: flex;
            gap: 1rem;
            align-items: center;
            & > img {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              object-fit: cover;
              background-color: #ccc;
            }
            .details {
              display: flex;
              flex: 1;
              flex-direction: column;
              .request-date {
                font-size: 0.8rem;
              }
              & > h5 {
                width: 100%;
                font-size: medium;
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
`;
export default PopRespondRequest;
