import React from 'react';
import { Col, Row } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';

import './app.css';
import MdbService from '../../services/mdb-service';
import CardList from '../card-list';
import Loader from '../loader';
import ErrorAlert from '../error-alert';
import Header from '../header';
import Footer from '../footer';

export default class App extends React.Component {
  state = {
    query: '',
    movieData: [],
    totalMovies: null,
    currentPage: 1,
    loading: false,
    error: false,
    errorText: 'Input title',
  };
  mdbService = new MdbService();
  urlPosters = 'https://image.tmdb.org/t/p/original/';

  delayedList = debounce((query, page) => {
    this.createMovieList(query, page);
  }, 1000);

  componentDidMount() {
    const { query, currentPage } = this.state;
    this.delayedList(query, currentPage);
  }
  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.clearList();
      this.delayedList(query, currentPage);
    }
  }

  clearList = () => {
    this.setState({ movieData: [] });
  };

  onLabelChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      query: value,
      loading: true,
      error: false,
    });
  };

  onError = (error) => {
    this.setState({
      loading: false,
      error: true,
      errorText: error.message,
    });
  };
  onSelectPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
      loading: true,
    });
  };

  createMovieList(query, page) {
    this.mdbService
      .getMovies(query, page)
      .then((list) => {
        this.setState({
          totalMovies: list.total_results,
        });
        list.results.forEach((item) => {
          this.setState(({ movieData }) => ({
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
            loading: false,
            error: false,
          }));
        });
      })
      .catch(this.onError);
  }
  render() {
    const { movieData, totalMovies, loading, error, errorText, query } = this.state;
    const hasData = movieData.length > 0;
    return (
      <Row justify="center" className="container">
        <Col span={12}>
          <Offline>Please check your connection</Offline>
          <Online>
            <Header query={query} onLabelChange={this.onLabelChange} />
            {loading ? <Loader /> : null}
            {error ? <ErrorAlert errorText={errorText} /> : null}
            <CardList movieData={movieData} loading={loading} />
            {hasData ? <Footer onSelectPage={this.onSelectPage} totalMovies={totalMovies} /> : null}
          </Online>
        </Col>
      </Row>
    );
  }
}
