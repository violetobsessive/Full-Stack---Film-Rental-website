import { Link } from "react-router-dom";

export const ExportTopFilms = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div
        className="container-fluid py-5 text-white 
    d-flex justify-content-center align-items-center"
      >
        <div>
          <h1 className="display-5 fw-bold">Find your next watch</h1>
          <p className="col-md-8 fs-4">
            Ready to explore the indie film world?
          </p>
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to="/search"
          >
            See our top picks
          </Link>
        </div>
      </div>
    </div>
  );
};
