import { useState, useEffect } from "react";
import FilmModel from "../../models/FilmModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchFilm } from "./components/SearchFilm";
import { Pagination } from "../Utils/Pagination";

export const SearchFilmsPage = () => {
  const [films, setFilms] = useState<FilmModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage] = useState(5);
  const [totalAmountOfFilms, setTotalAmountOfFilms] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Film Category");

  useEffect(() => {
    const fetchFilms = async () => {
      const baseUrl: string = "http://localhost:8080/api/films";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${filmsPerPage}`;
      } else {
        //first value - the object you want to replace; second value - the object you want to replace with
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

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

      setTotalAmountOfFilms(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

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
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);
  //each time currentPage changes, recall the useEffect Hook

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

  const searchHandleChange = () => {
    setCurrentPage(1);
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${filmsPerPage}`
      );
    }
    setCategorySelection("Film Category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value === "Comedy" ||
      value === "Romantic" ||
      value === "Horror" ||
      value === "Sci-fi" ||
      value === "Psychologic" ||
      value === "Drama"
    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${filmsPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${filmsPerPage}`);
    }
  };

  const indexOfLastFilm: number = currentPage * filmsPerPage;
  const indexOfFirstFilm: number = indexOfLastFilm - filmsPerPage;
  let lastItem =
    filmsPerPage * currentPage <= totalAmountOfFilms
      ? filmsPerPage * currentPage
      : totalAmountOfFilms;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  //retrieve the user input with e.target.value
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => searchHandleChange()}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {categorySelection}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-aria-labelledby="dropdownMenuButton1"
                >
                  <li onClick={() => categoryField("All")}>
                    <a className="drop-item" href="#">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField("Comedy")}>
                    <a className="drop-item" href="#">
                      Comedy
                    </a>
                  </li>
                  <li onClick={() => categoryField("Romantic")}>
                    <a className="drop-item" href="#">
                      Romantic
                    </a>
                  </li>
                  <li onClick={() => categoryField("Horror")}>
                    <a className="drop-item" href="#">
                      Horror
                    </a>
                  </li>
                  <li onClick={() => categoryField("Sci-fi")}>
                    <a className="drop-item" href="#">
                      Sci-Fi
                    </a>
                  </li>
                  <li onClick={() => categoryField("Psychologic")}>
                    <a className="drop-item" href="#">
                      Psychologic
                    </a>
                  </li>
                  <li onClick={() => categoryField("Drama")}>
                    <a className="drop-item" href="#">
                      Drama
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalAmountOfFilms > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfFilms})</h5>
              </div>
              <p>
                {indexOfFirstFilm + 1} to {lastItem} of {totalAmountOfFilms}{" "}
                items:
              </p>
              {films.map((film) => (
                <SearchFilm film={film} key={film.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h5>Can't find what you are looking for?</h5>
              <a
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                href="#"
              >
                Contact Support
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
