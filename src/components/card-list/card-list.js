import React from 'react';
import './card-list.css';

import Card from '../card';

function CardList({ movieData }) {
  const elements = movieData.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="card-item">
        <Card itemProps={itemProps} />
      </li>
    );
  });
  return <ul className="card-list">{elements}</ul>;
}

export default CardList;
