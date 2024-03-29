import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from '../redux/store.js';
import {Provider} from 'react-redux';
import { extendedApiSlice } from '../features/post/postSlice.js';
import { fetchUser } from '../features/users/usersSlice.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(fetchUser());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
