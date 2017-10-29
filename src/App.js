import React, {Component} from 'react';
import styled from 'styled-components';
import Search from 'react-icons/lib/md/search';
import Close from 'react-icons/lib/md/close';
import AnimatedInput from './AnimatedInput';
import Articles from './Articles';
import axios from 'axios';
import htmlToText from 'html-to-text';

const Container = styled.div`
  background-color: darkslategray;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100%;
  align-items: center;
  padding-bottom: 30px;
  justify-content: flex-start;
  transition: padding-top .6s ease-in-out;
`;

const Link = styled.a`
  color: white;
  padding: 5px;
  
  &:link, &:visited {
    color: white;
    text-decoration: none;
  }
`;


const dummy_articles = [
    {
        id: "1",
        title: "Alphabet",
        text: "An alphabet is a standard set of letters (basic written symbols or graphemes) that is used to write one or more languages based upon the general principle that the letters represent phonemes (basic significant sounds) of the spoken language. This is in contrast to other types of writing systems, such as syllabaries (in which each character represents a syllable) and logographies (in which each character represents a word, morpheme, or semantic unit)."
    },
    {
        id: "2",
        title: "Australian Broadcasting Corporation",
        text: "he Australian Broadcasting Corporation (ABC) is Australia's national broadcaster, funded by Australian taxpayers but specifically independent of Government and politics in the Commonwealth. The ABC plays a leading role in journalistic independence and is fundamental in the history of broadcasting in Australia, its model based on – "
    }
];

class App extends Component {

    state = {
        showTip: true,
        articles: [],
        paddingTop: "180px"
    };

    requestWithTerm(term) {
        this.setState({articles: []});
        axios.get(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch=${term}&srprop=snippet`).then((res) => {
            if (res.data.error) return;

            const articles = res.data.query.search.map((search) => {
                const text = htmlToText.fromString(search.snippet);

                return {
                    id: search.pageid,
                    title: search.title,
                    text,
                    link: "https://en.wikipedia.org/?curid=" + search.pageid
                }
            });

            this.setState({articles});
        })
    }

    render() {
        return (
            <Container style={{paddingTop: this.state.paddingTop}}>
                <Link href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Click here for a random
                    article</Link>
                <AnimatedInput
                    onEnter={(term) => {
                        this.setState({showTip: false, paddingTop: "30px"});
                        this.requestWithTerm(term);
                    }}
                    close={() => {
                        this.setState({paddingTop: "180px"});
                        this.setState({articles: [], showTip: true});
                    }}
                />
                {this.state.showTip && <Link>Click icon to search</Link>}
                <Articles articles={this.state.articles}/>
            </Container>
        );
    }
}

export default App;
