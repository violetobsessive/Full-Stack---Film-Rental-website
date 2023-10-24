import { ReturnFilm } from "./ReturnFilm";
import { useState, useEffect } from "react";
import FilmModel from "../../../models/FilmModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
  const [films, setFilms] = useState<FilmModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      const baseUrl: string = "http://localhost:8080/api/films";

      const url: string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      //check if we successfully got the data - guard clause
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      //grab the response and turn into json (asynchronous)
      //an js object of 'embedded' in api - have all the films inside
      const responseJson = await response.json();

      //jump into json and get all the films
      const responseData = responseJson._embedded.films;

      const loadedFilms: FilmModel[] = [];

      for (const key in responseData) {
        loadedFilms.push({
          id: responseData[key].id,
          title: responseData[key].title,
          director: responseData[key].director,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }
      setFilms(loadedFilms);
      setIsLoading(false);
    };
    fetchFilms().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up late on a weekday to finish" film</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5
       d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {films.slice(0, 3).map((film) => (
                <ReturnFilm film={film} key={film.id} />
              ))}
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {films.slice(3, 6).map((film) => (
                <ReturnFilm film={film} key={film.id} />
              ))}
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {films.slice(6, 9).map((film) => (
                <ReturnFilm film={film} key={film.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnFilm film={films[6]} key={films[6].id} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-lg" to="/search">
          View More
        </Link>
      </div>
    </div>
  );
};
