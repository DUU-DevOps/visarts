import './App.css';
import Navbar from './components/Navbar.js';
import MeetUs from './components/meetUs/MeetUs.js';
import Events from './components/eventsCalendar/Events.js';
import ArtistSpotlight from './components/artistSpotlight/ArtistSpotlight.js';
import GetInvolved from './components/getInvolved/GetInvolved.js';
import Homepage from './components/homepage/Homepage.js';
import Helmet from 'react-helmet';
import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Helmet>
            <style>{'body { background-color: #ffffff; }'}</style>
            <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,700|Open+Sans:400,400i,700" rel="stylesheet"></link>
      </Helmet>
          <Navbar />
          <Routes>
            <Route exact path='/' element = {<Homepage />} />
            <Route path = '/meet-us' element = { <MeetUs />} />
            <Route path = '/events' element = { <Events />} />
            <Route path =  '/artist-spotlight' element = {<ArtistSpotlight />} />
            <Route path = '/get-involved' element = {<GetInvolved />} />
          </Routes>
    </div>
  );
}

export default App;
