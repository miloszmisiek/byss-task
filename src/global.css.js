import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: rgb(255,255,255);
    background: linear-gradient(234deg, rgba(255,255,255,1) 8%, rgba(215,225,236,1) 47%, rgba(255,255,255,1) 100%);
  }
  #root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: 'Nanum Gothic', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popover {
z-index: 1050 !important;
}

@media screen and (max-width: 610px) {
    #root {
      padding: 1rem;
    }
  }
`;
