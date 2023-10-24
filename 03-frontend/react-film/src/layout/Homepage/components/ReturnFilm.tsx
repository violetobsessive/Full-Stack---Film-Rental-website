import React from "react";
import FilmModel from "../../../models/FilmModel";
import { Link } from "react-router-dom";

export const ReturnFilm: React.FC<{ film: FilmModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 mb-3">
      <div className="text-center">
        {props.film.img ? (
          <img src={props.film.img} width="150" height="220" alt="book" />
        ) : (
          <img
            src={require("./../../../Images/FilmsImages/film-arrival.jpg")}
            width="150"
            height="220"
            alt="film"
          />
        )}

        <h6 className="mt-2">{props.film.title}</h6>
        <p>{props.film.director}</p>
        <Link
          className="btn main-color text-white"
          to={`checkout/${props.film.id}`}
        >
          Reserve
        </Link>
      </div>
    </div>
  );
};
