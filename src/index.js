import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Homepage from './views/Homepage';
import App from './views/App';
import Timeline from './views/Timeline';
import Map from './views/Map';
import About from './views/About';
import NewPost from './views/NewPost';
import './index.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/:id" component={App}>
      <IndexRoute component={Timeline} />
      <Route path="/:id/map" component={Map} />
      <Route path="/:id/about" component={About} />
      <Route path="/:id/newpost" component={NewPost} />
    </Route>
  </Router>
), document.getElementById('root'));
