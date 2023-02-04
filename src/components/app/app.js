import React from 'react';
import { Col, Row } from 'antd';

import './app.css';
import MdbService from '../../services/mdb-service';
import CardList from '../card-list';

export default class App extends React.Component {
  state = {
    movieData: [],
  };
  urlPosters = 'https://image.tmdb.org/t/p/original/';

  mdbService = new MdbService();

  componentDidMount() {
    this.createMovieList();
  }
  createMovieList() {
    this.mdbService.getMovies().then((list) => {
      list.forEach((item) => {
        this.setState((state) => {
          const { movieData } = state;
          return {
            movieData: [
              ...movieData,
              {
                id: item.id,
                title: item.original_title,
                releaseDate: item.release_date,
                genre: 'Some genre',
                description: item.overview,
                filmRating: item.vote_average,
                poster: `${this.urlPosters}${item.poster_path}`,
              },
            ],
          };
        });
      });
    });
  }
  render() {
    const { movieData } = this.state;
    return (
      <Row justify="center" className="container">
        <Col span={12}>
          <CardList movieData={movieData} />
        </Col>
      </Row>
    );
  }
}
