import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Trending } from "./components/Trending";
import { Popular } from "./components/Popular";
import { Movie } from "./components/Movie";
import { Tvshows } from "./components/Tvshows";
import { People } from "./components/People";
import { TvDetails } from "./components/TvDetails";
import { PersonDetails } from "./components/PersonDetails";
import MovieDetails from "./components/MovieDetails";
import Trailer from "./components/templates/Trailer";
import MovieProvider from "./components/MovieProvider";
import Plyer from "./components/templates/Plyer";
import PlyerTwo from "./components/templates/PlyerTwo";
import TvSeason from "./components/TvSeason";
import PlyerThree from "./components/templates/PlyerThree";
import Notpage from "./components/Notpage";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Forget from "./components/Authentication/Forget";

function App() {
  return (
    <div className="bg-[#303030] flex w-full h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
          <Route path="/movie/details/:id/player" element={<Plyer />} />
          <Route path="/movie/details/:id/playertwo" element={<PlyerTwo />} />
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
          <Route path="/tv/details/:id/player" element={<Plyer />} />
        </Route>
        <Route path="/tv/details/:id/season/:id" element={<TvSeason />} >
          <Route path="/tv/details/:id/season/:id/episode/:id" element={<PlyerThree />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
      
        <Route path="/MovieProvider" element={<MovieProvider />} />
        <Route path="*" element={<Notpage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget" element={<Forget />} />
      </Routes>
    </div>
  );
}

export default App;
