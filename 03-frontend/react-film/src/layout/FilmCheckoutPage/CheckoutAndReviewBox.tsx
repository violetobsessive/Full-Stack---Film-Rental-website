import { Link } from "react-router-dom";
import FilmModel from "../../models/FilmModel";
import { LeaveAReview } from "../Utils/LeavAReview";

export const CheckoutAndReviewBox: React.FC<{
  film: FilmModel | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b> 0/5 </b>
            films checked out
          </p>
          <hr />
          {props.film &&
          props.film.copiesAvailable &&
          props.film.copiesAvailable > 0 ? (
            <h4 className="text-primary">Available</h4>
          ) : (
            <h4 className="main-color">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{props.film?.copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{props.film?.copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        <Link to="/#" className="btn btn-custom btn-lg">
          Sign in
        </Link>
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to leave a review</p>
      </div>
    </div>
  );
};
