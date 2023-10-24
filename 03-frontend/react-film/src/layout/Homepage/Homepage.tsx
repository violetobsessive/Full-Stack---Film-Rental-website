import React from "react";
import { ExportTopFilms } from "./components/ExploreTopFilms";
import { Carousel } from "./components/Carousel";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

export const Homepage = () => {
  return (
    <div>
      <ExportTopFilms />
      <Carousel />
      <Heros />
      <LibraryServices />
    </div>
  );
};
