import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel";
import { Review } from "../Utils/Review";

export const LatestReviews: React.FC<{
  reviews: ReviewModel[];
  filmId: number | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div className={props.mobile ? "mt-3" : "row-mt-5"}>
      <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
        <h4 className="text-primary">Latest Reviews </h4>
      </div>
      <div className="col-sm-10 col-md-10">
        {props.reviews.length > 0 ? (
          <>
            {props.reviews.slice(0, 3).map((eachReview) => (
              <Review review={eachReview} key={eachReview.id}></Review>
            ))}
            <div>
              <Link type="button" className="btn btn-custom btn-lg" to="#">
                Reach all reviews
              </Link>
            </div>
            <hr />
          </>
        ) : (
          <div>
            <p className="lead">Currently there are no reviews for this film</p>
          </div>
        )}
      </div>
    </div>
  );
};
