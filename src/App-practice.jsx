import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

// STYLED COMPONENTS LIBRARY - eliminates global css problems
// returns a new component
// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
// `;

const StyledApp = styled.main`
  /* background-color: orangered; */
  padding: 20px;
`;
// END STYLES

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading type='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h2'>Check in and out</Heading>
              <Button variation='primary' size='medium'>
                Check in
              </Button>
              <Button variation='secondary' size='small'>
                Check in
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input type='number' placeholder='Number of guests' />
              <Input type='number' placeholder='Number of guests' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default App;
