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
  
  .Login {
    padding: 30px 0;
  }

  .Login form {
    padding-top: 40px;
    margin: 0 auto;
    max-width: 350px;
  }
  
  .well-custom {
     margin-top: 40%;
  }
  
  .modal-title-custom {
    font-weight: bold
  }
  
  .login-image {
     display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
`;
