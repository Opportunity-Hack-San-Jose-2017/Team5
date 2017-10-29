/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import axios from 'axios';
import React, { Component } from 'react';
import FileUpload from '../../components/HomePage/FileUpload';

export default function HomePage() { // eslint-disable-line react/prefer-stateless-function
  return (
    <FileUpload surveys={surveys}/>
  );
}
