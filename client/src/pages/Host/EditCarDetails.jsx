import React, { useState } from "react";
import styled from "styled-components";
import Data from "../../data/data.json";
import {
  toastOptionError,
  toastOptionSuccess,
} from "../../utils/functions/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCar, getCarErr, getCarStatus } from "../../features/carSlice";
import { useOutletContext } from "react-router-dom";
import GeneralSection from "./Components/AddCarGeneral";
import AdditionalSection from "./Components/AddCarAdditional";
import ProofSection from "./Components/AddCarProof";
const EditCarDetails = () => {
  const { value } = useOutletContext();
  const dispatch = useDispatch();
  const carStatus = useSelector(getCarStatus);
  const carErr = useSelector(getCarErr);
  const { additionalInfo, ...mainDetails } = value;
  const updatedCardDetails = {
    ...mainDetails,
    ...(additionalInfo ? additionalInfo : {}),
  };
  const [formData, setFormData] = useState(updatedCardDetails);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState(formData?.carPhotos);
  const [addCarRequest, setAddCarRequest] = useState("idle");
  const category = Data.filters.filter(
    (item) => item.filtername === "Car type"
  )[0].types;
  const gears = Data.filters.filter(
    (item) => item.filtername === "Gear type"
  )[0].types;
  const fuels = Data.filters.filter(
    (item) => item.filtername === "Fuel type"
  )[0].types;
  const ac = Data.filters.filter(
    (item) => item.filtername === "Air Condition"
  )[0].types;
  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        setSelectedFiles((prevData) => [...prevData, reader.result]);
      };
    }
  };
  const handleDelete = (index) => {
    const filteredFiles = selectedFiles.filter((file, i) => i !== index);
    setSelectedFiles(filteredFiles);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addCarRequest === "idle") {
      try {
        setAddCarRequest("pending");
        dispatch(
          updateCar({
            carDetails: { ...formData },
          })
        );
        if (carStatus === "fulfilled") {
          toast.success("Car updated successfully", toastOptionSuccess);
        } else {
          toast.error(carErr, toastOptionError);
        }
      } catch (err) {
      } finally {
        setCarPostRequest("idle");
      }
    }
  };
  const handleUpload = () => {
    setFormData((prevData) => ({
      ...prevData,
      carPhotos: [...selectedFiles],
    }));
  };
  return (
    <Container>
    <nav className="stages">
      <p
        className={selectedPage === 0 ? "selected":""}
        onClick={() => setSelectedPage(0)}
      >
        General
      </p>
      <p
        className={selectedPage === 1 ? "selected":""}
        onClick={() => setSelectedPage(1)}
      >
        Additional
      </p>
      <p
        className={selectedPage === 2 ? "selected":""}
        onClick={() => setSelectedPage(2)}
      >
        Proof
      </p>
    </nav>
    <div className="add-car">
      {selectedPage === 0 ? (
        <GeneralSection
          formData={formData}
          handleInputChange={handleInputChange}
          category={category}
        />
      ) : selectedPage === 1 ? (
        <AdditionalSection
          formData={formData}
          handleInputChange={handleInputChange}
          fuels={fuels}
          gears={gears}
          ac={ac}
        />
      ) : (
        <ProofSection
          handleDelete={handleDelete}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
          handleUpload={handleUpload}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
    <div className="nav-button">
      {selectedPage > 0 && (
        <button
          className="normal-button"
          onClick={(e) => {
            e.preventDefault();
            setSelectedPage(selectedPage - 1);
          }}
        >
          Back
        </button>
      )}
      {selectedPage < 2 && (
        <button
          type="submit"
          className="primary-button"
          onClick={(e) => {
            e.preventDefault();
            setSelectedPage(selectedPage + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
    <ToastContainer />
  </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  gap: 0.5rem;
  height: 30rem;
  border-radius: 5px;
  & > h2 {
    color: rgb(40, 167, 69);
    text-align: center;
  }
  .stages {
    display: flex;
    align-self: center;
    gap: 0.5rem;
    width: 20rem;
    justify-content: space-evenly;
    & > p {
      padding: 0.25rem;
      border-radius: 0.25rem;
      border: 1px solid #e0dfdf;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .selected {
      color: white;
      background-color: #000000ba;
    }
  }
  .add-car {
    display: flex;
    flex-direction: column;
    height: 25rem;
    gap: 0.5rem;
  }
  .nav-button {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;
export default EditCarDetails;
