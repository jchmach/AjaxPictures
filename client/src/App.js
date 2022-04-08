import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import MovieTimeslots from './pages/MovieTimeslots';
import PurchaseTicket from './pages/PurchaseTicket';
import MenuBar from './components/MenuBar';
import Movie from './pages/Movie';
import ManageBookings from './pages/ManageBookings';
import Movies from './pages/Movies';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/movietimeslots" element={<MovieTimeslots/>}/>
            <Route path="/purchaseticket" element={<PurchaseTicket/>}/>
            <Route path="/movie" element={<Movie/>}/>
            <Route path="/managebookings" element={<ManageBookings/>}/>
            <Route path="/movie/:id" element={<Movie/>}/>
            <Route path="/Movies" element={<Movies/>}/>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}
export default App;
