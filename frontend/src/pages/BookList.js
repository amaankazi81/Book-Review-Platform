import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import Pagination from '../components/Pagination';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0
  });
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
    fetchGenres();
    fetchAuthors();
  }, [filters, pagination.currentPage]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...filters
      };
      
      const response = await axios.get('/books', { params });
      setBooks(response.data.books);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalBooks: response.data.totalBooks
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('/books/meta/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('/books/meta/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      author: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  return (
    <div>
      <div className="filters">
        <div className="filters-row">
          <div className="form-group">
            <label htmlFor="genre">Filter by Genre</label>
            <select
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Filter by Author</label>
            <select
              id="author"
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="sortBy">Sort by</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="createdAt">Date Added</option>
              <option value="averageRating">Average Rating</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="sortOrder">Order</label>
            <select
              id="sortOrder"
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          
          <div className="form-group">
            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', color: '#718096' }}>
            Showing {books.length} of {pagination.totalBooks} books
          </div>
          
          <div className="grid grid-3">
            {books.map(book => (
              <div key={book._id} className="card">
                <h3 className="card-title">
                  <Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {book.title}
                  </Link>
                </h3>
                <div className="card-meta">
                  by {book.author} • {book.genre}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <StarRating rating={book.averageRating} />
                  <span>({book.totalReviews} reviews)</span>
                </div>
                <div className="card-meta">
                  Added by {book.addedBy?.username} • {new Date(book.createdAt).toLocaleDateString()}
                </div>
                <Link to={`/books/${book._id}`} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
          
          {books.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
              No books found matching your criteria.
            </div>
          )}
          
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default BookList;