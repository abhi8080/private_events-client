import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <EventList />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route
            path="/events/:eventId"
            element={
              <>
                <Navbar />
                <EventDetails />
              </>
            }
          />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
