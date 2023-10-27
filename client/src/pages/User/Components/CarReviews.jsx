import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUserDetailsById } from "../../../features/userSlice";
import { AiFillStar } from "react-icons/ai";
import formatDate from "../../../utils/functions/formatDate";
import PropTypes from "prop-types";
const ReviewCard = (props) => {
  const reviewerName = useSelector((state) =>
    getUserDetailsById(state, props?.userId)
  );
  return (
    <Container>
      <div className="comment-box">
        <div className="comments">
          {[1, 2, 3, 4, 5].map((star, index) => {
            return (
              <AiFillStar
                key={index}
                className={`star ${star <= props.ratings ? "selected" : ""}`}
              ></AiFillStar>
            );
          })}
        </div>
        <p className="name">{reviewerName?.fullName}</p>
        <p className="comment">{props.comments}</p>
        <p className="date">{formatDate(props.reviewedOn)}</p>
      </div>
    </Container>
  );
};
ReviewCard.propTypes = {
  userId: PropTypes.string.isRequired,
  ratings: PropTypes.number.isRequired,
  comments: PropTypes.string.isRequired,
  reviewedOn: PropTypes.any.isRequired,
};
const Container = styled.div`
  .comment-box {
    display: flex;
    width: 15rem;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.3rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    .comments {
      display: flex;
      gap: 0.25rem;
    }
    svg {
      color: #707070;
    }
    .selected {
      color: orange;
    }
    .name {
      font-weight: 600;
    }
    .date {
      color: #8c8c8c;
      font-size: small;
    }
    p {
      text-align: justify;
    }
  }
`;

export default ReviewCard;
