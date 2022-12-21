import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import styled from 'styled-components';

export const AppWrapper = styled.div``;

export const AppContainer = styled(Container)`
  /* @media (min-width: 576px) {
    .container,
    .container-sm {
      max-width: 720px !important;
    }
  } */
`;

export const AppRow = styled(Row)`
  @media screen and (max-width: 992px) {
    gap: 2rem;
  }
`;
