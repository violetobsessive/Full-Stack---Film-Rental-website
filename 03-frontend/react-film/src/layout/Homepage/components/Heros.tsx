import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been watching?</h1>
              <p className="lead">
                We really care for what you have been watching. Whether it is
                for a lazy sunday afternoon, or for a date night snuggle, we are
                devoted to provide top-class content for you!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Explore top films
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md container d-flex
            justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Check in daily to see our needly added films! We work hard to
                make sure all we provide best indie films for our fellow film
                enthusiastica! We're proud of our selecion, it has always been
                our priority.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been watching?</h1>
              <p className="lead">
                We really care for what you have been watching. Whether it is
                for a lazy sunday afternoon, or for a date night snuggle, we are
                devoted to provide top-class content for you!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Explore top films
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Check in daily to see our needly added films! We work hard to
                make sure all we provide best indie films for our fellow film
                enthusiastica! We're proud of our selecion, it has always been
                our priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
