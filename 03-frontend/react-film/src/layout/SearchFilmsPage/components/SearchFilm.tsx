import { Link } from "react-router-dom";
import FilmModel from "../../../models/FilmModel";

export const SearchFilm: React.FC<{ film: FilmModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-done d-lg-block d-flex justify-content-center">
            {props.film.img ? (
              <img src={props.film.img} width="150" height="220" alt="Film" />
            ) : (
              <img
                src={require("./../../../Images/FilmsImages/film-arrival.jpg")}
                width="150"
                height="220"
                alt="Film"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h4>{props.film.title}</h4>
            <h6 className="text-primary">{props.film.director}</h6>
            <p className="card-text">{props.film.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            className="btn btn-md main-color text-white"
            to={`/checkout/${props.film.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
