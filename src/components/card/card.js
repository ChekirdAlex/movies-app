import React from 'react';
import './card.css';
import { format } from 'date-fns';

import { cutDescription } from '../../helpers';
import Loader from '../loader';

function Card({ itemProps, loading }) {
  const movieDescription = cutDescription(itemProps.description);
  const movieReleaseDate = itemProps.releaseDate
    ? format(new Date(Date.parse(itemProps.releaseDate)), 'MMMM d, y')
    : null;

  return (
    <div className="movie-card">
      {loading ? <Loader /> : null}
      <div className="movie-poster">
        <img src={itemProps.poster} alt="Movie Poster" className="poster" />
      </div>
      <div className="movie-data">
        <h2 className="movie-data__title">{itemProps.title}</h2>
        <span className="movie-data__relese-date">{movieReleaseDate}</span>
        <ul className="movie-data__tags">
          <li className="movie-data__tag">Action</li>
          <li className="movie-data__tag">Drama</li>
        </ul>
        <p className="movie-data__description">{movieDescription}</p>
      </div>
    </div>
  );
}

export default Card;
