import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
 
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .media {
    margin-top: 10px!important;
    margin-bottom: 10px!important;
    margin-right: 25px;
    padding: 0px 10px 0px 10px;
    background-color: #e6e6e6;
  }
  
  .survey-btn {
    margin-top: 40px;
    float: right
  }
  
  .navbar-brand img {
    
    max-width:110px;
    max-height: 110px;
  }
`;
