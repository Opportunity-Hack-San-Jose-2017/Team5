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
    background-color: #f2f2f2;
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
    float: right;
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
  
  .upload-primary {
    float: right;
    margin-right: 25px;
  }
  
  .modal-title-custom {
    font-weight: bold
  }
  
  .login-image {
     display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
  margin-top: 28px
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #c70b2b;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 19px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #006c68;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.inner-addon { 
    position: relative; 
}

.inner-addon .glyphicon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}
.right-addon input { padding-right: 30px; }
.right-addon .glyphicon { right: 0px;}

.panel-heading a:after {
    font-family: 'Glyphicons Halflings';
    content: "\\e114";    
    float: right; 
    color: grey; 
}
.panel-heading a.collapsed:after {
    content: "\\e080";
}
#container{
    padding:10px;
    width: 90%;
    margin-left: 5%;
}
.panel-body {
    height: 300px;
    overflow-y:auto;
}
.panel-heading.collapsed .fa-chevron-down,
.panel-heading .fa-chevron-right {
  display: none;
}
.panel-heading.collapsed .fa-chevron-right,
.panel-heading .fa-chevron-down {
  display: inline-block;
}
i.fa {
  cursor: pointer;
  margin-right: 5px;
}
.collapsed ~ .panel-body {
  padding: 0;
}
.navbar-brand{
 margin-bottom:10px;
}
.next {
  margin-right: 25px;
}
}
`;
