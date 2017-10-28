import React, {Component} from 'react';
import styled from 'styled-components';
import Search from 'react-icons/lib/md/search';
import Close from 'react-icons/lib/md/close';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 4px solid orange;
  padding: 10px;
  font-size: 20px;
  margin: 30px 0;
  background-color: darkslategray;
  transition: width 1s ease-in-out, opacity 1s ease-in-out;
  color: white;
  border-radius: 10px;
  height: 60px;
  box-sizing: border-box;
 
  &:focus {
      outline: none;
  }
`;

const CloseButton = styled(Close)`
  position: absolute;
  right: 15%;
  top: 40px;
  font-size: 40px;
  color: orange;
  transition: opacity 1s ease-in-out;
`;

const InputAreaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const InputArea = ({style, onClose, onEnterPress}) => {
    return (
        <InputAreaContainer>
            <Input style={style} onKeyPress={onEnterPress}/>
            <CloseButton onClick={onClose} style={{opacity: style.opacity}}>close</CloseButton>
        </InputAreaContainer>
    )
};

const SearchIcon = styled(Search)`
  font-size: 60px;
  color: orange;
  margin: 30px 0;
  
  transition: opacity 1s ease-in-out;
`;

class AnimatedInput extends Component {

    state = {
        showSearchInput: false,
        inputWidth: "0px",
        inputOpacity: 0,
        iconOpacity: 1
    };

    // for testing
    componentDidMount() {
        this.showInput();
    }

    showInput = (e) => {
        if (e) e.preventDefault();
        this.setState({showSearchInput: true});

        setTimeout(() => {
            this.setState({inputWidth: "80%", inputOpacity: 1, iconOpacity: 0});
        }, 50);
    };

    hideInput = (e) => {
        e.preventDefault();
        this.setState({showSearchInput: false});

        setTimeout(() => {
            this.setState({inputWidth: "0", inputOpacity: 0, iconOpacity: 1})
        }, 50)
    };

    render() {
        return (
            <Container>
                {this.state.showSearchInput &&
                <InputArea
                    style={{width: this.state.inputWidth, opacity: this.state.inputOpacity}}
                    onClose={this.hideInput}
                    onEnterPress={this.props.onEnterPress}
                />}
                {!this.state.showSearchInput &&
                <SearchIcon
                    style={{opacity: this.state.iconOpacity}}
                    onClick={this.showInput}/>}
            </Container>
        );
    }
}

export default AnimatedInput;
