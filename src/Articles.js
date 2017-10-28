import React, {Component} from 'react';
import styled from 'styled-components';

const ArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 10%;
  padding-top: 100px;
  transition: padding-top 1s ease-in-out, opacity 1s ease-in-out;
`;

const ArticleContainer = styled.div`
  box-sizing: border-box;
  padding: 30px;
  background-color: beige;
  color: darkslategray;
  margin-bottom: 20px;

  &:hover {
    box-shadow: -5px 0px 0px 0px darkorange;
  }
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const Article = ({title, text}) => {
    return (
        <ArticleContainer>
            <Title>{title}</Title>
            <Text>{text}</Text>
        </ArticleContainer>
    )
};

class Articles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            paddingTop: "50px",
            opacity: 0
        }

    }

    componentWillReceiveProps({articles}) {
        if (articles && articles.length > 0) {
            this.showAfterDelay();
        } else {
            this.hide();
        }
    }

    componentDidMount() {
        this.showAfterDelay();
    }

    showAfterDelay() {
        setTimeout(() => {
            this.show();
        }, 1000);
    }

    show() {
        this.setState({paddingTop: 0, opacity: 1});
    }

    hide() {
        this.setState({paddingTop: "50px", opacity: 0});
    }

    render() {
        const {articles} = this.props;
        return (
            <ArticlesContainer style={{paddingTop: this.state.paddingTop, opacity: this.state.opacity}}>
                {articles.map((article) => {
                    return <Article key={article.id} title={article.title} text={article.text}/>
                })}
            </ArticlesContainer>
        );
    }

}

export default Articles;
