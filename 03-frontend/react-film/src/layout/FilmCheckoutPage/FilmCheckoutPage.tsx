import { useEffect, useState } from "react";
import FilmModel from "../../models/FilmModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { LatestReviews } from "./LatestReviews";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { useOktaAuth } from "@okta/okta-react";

export const FilmCheckoutPage = () => {
  const { authState } = useOktaAuth();

  const [film, setFilm] = useState<FilmModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(5);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  // Is Book Check Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const filmId = window.location.pathname.split("/")[2];

  // Fetch film useEffect()
  useEffect(() => {
    const fetchFilm = async () => {
      const baseUrl: string = `http://localhost:8080/api/films/${filmId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedFilm: FilmModel = {
        id: responseJson.id,
        title: responseJson.title,
        director: responseJson.director,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setFilm(loadedFilm);
      setIsLoading(false);
    };
    fetchFilm().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  // Fetch film reviews useEffect()
  useEffect(() => {
    const fetchFilmReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByFilmId?filmId=${filmId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          film_id: responseData[key].filmId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchFilmReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  // Fetch User Current Loans Count useEffect()
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {};
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [authState]);

  if (isLoading || isLoadingReview) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {film?.img ? (
              <img src={film?.img} width="130" height="220" alt="Film" />
            ) : (
              <img
                src={require("./../../Images/FilmsImages/film-arrival.jpg")}
                width="130"
                height="220"
                alt="Film"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{film?.title}</h2>
              <h5 className="text-primary">{film?.director}</h5>
              <p className="lead">{film?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox film={film} mobile={false} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} filmId={film?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center alighn-items-center">
          {film?.img ? (
            <img src={film?.img} width="130" height="220" alt="Film" />
          ) : (
            <img
              src={require("./../../Images/FilmsImages/film-arrival.jpg")}
              width="130"
              height="220"
              alt="Film"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{film?.title}</h2>
            <h5 className="text-primary">{film?.director}</h5>
            <p className="lead">{film?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox film={film} mobile={true} />
        <hr />
        <LatestReviews reviews={reviews} filmId={film?.id} mobile={true} />
      </div>
    </div>
  );
};
