import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
  }

  * {
    color: white;
  }

  .modal-content {
    background-color: black;
    border-color: #00c1f5;
  }

  .modal-backdrop {
    // background-color: blue;
  }

  .modal-title {
    justify-content: spaced-between;
  }
  
  .modal-headers {
    justify-content: spaced-between;
    margin-bottom: 0;
    font-size: 1.4rem;
    // display: inline;
  }

  h5 {
    color: #ffc107; 
  }

  .modal-header .btn-close {
    margin 0;
  }
  
  .modal-footer {
    justify-content: space-between;
  }

  .oddtable {
    // background-color: #2a2513; // yellow
    background-color: #00212a; // blue
  }

  .failed {
    color: red;
  }

  .skipped {
    color: gray;
  }

  .edit-alarm {
    display: block;
  }

  .base-btn {
    vertical-align: baseline;
  }

  .about-link {
    color: #00c1f5;
  }

  .footer {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
`;

export const FlexCenteringContainer = styled.div`
  display: flex;
  justify-content: center;
`;
