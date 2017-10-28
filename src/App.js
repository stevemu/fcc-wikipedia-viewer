import React, {Component} from 'react';
import styled from 'styled-components';
import Search from 'react-icons/lib/md/search';
import Close from 'react-icons/lib/md/close';
import AnimatedInput from './AnimatedInput';

const Container = styled.div`
  background-color: darkslategray;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100%;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  color: white;
  padding: 5px;
  
  &:link, &:visited {
    color: white;
    text-decoration: none;
  }
`;


class App extends Component {

    state = {
        showTip: true
    };

    render() {
        return (
            <Container>
                <Link href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Click here for a random article</Link>
                <AnimatedInput onEnterPress={() => {
                  this.setState({showTip: false});
                }}/>
                {this.state.showTip && <Link>Click icon to search</Link>}

            </Container>
        );
    }
}

export default App;
