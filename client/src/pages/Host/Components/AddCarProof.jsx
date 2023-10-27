import React from "react";
import styled from "styled-components";
import { BiSolidAddToQueue } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ProofSection = ({
  handleDelete,
  handleFileChange,
  selectedFiles,
  handleUpload,
  handleSubmit,
}) => {
  return (
    <Container>
      <div className="proof-section">
        <div className="car-image">
          <label className="car-image-add">
            Add images (only jpg,png,jpeg allowed)
            <BiSolidAddToQueue />
            <input
              type="file"
              multiple
              accept=".jpg,.png,.jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
              name="carPhotos"
            ></input>
          </label>
          <ul className="car-image-list">
            {selectedFiles.map((file, index) => (
              <div key={index}>
                <img src={file} alt={index}></img>
                <AiFillDelete onClick={() => handleDelete(index)} />
              </div>
            ))}
          </ul>
        </div>
        <div className="upload">
          <button className="positive-button" onClick={handleUpload}>
            Upload Images
          </button>
        </div>
      </div>
      <button className="primary-button" onClick={handleSubmit}>
        Add a car
      </button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  .proof-section {
    display: flex;
    gap: 0.5rem;
    align-self: center;
    flex-direction: column;
    align-items: center;
    .car-image {
      display: flex;
      flex-direction: column;
      width: 30rem;
      height: 14rem;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 0.5rem;
        &-thumb {
          background-color: rgb(72, 71, 71);
          border-radius: 1rem;
        }
      }
      .car-image-add {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        svg {
          transition: 0.2s ease-in;
          cursor: pointer;
          &:hover {
            color: blue;
          }
        }
      }
      .car-image-list {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        list-style: none;
        & > div {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          transition: 0.2s ease-in;
          & > img {
            width: 6rem;
            border-radius: 0.25rem;
          }
          & > svg {
            cursor: pointer;
            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }
  .primary-button {
  }
  @media screen and (max-width: 675px) {
    .proof-section {
      .car-image {
        width: 20rem;
      }
    }
  }
`;
export default ProofSection;
