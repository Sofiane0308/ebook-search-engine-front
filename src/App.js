import React, { useState } from 'react';
import './App.css';
import Results from './Results';
import Book from './Book';
import { Row, Col, Divider, Input, Checkbox, Space, AutoComplete } from 'antd';
import { Switch, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import axios from 'axios';


// Main page with the search bar and ( Results or ebook details as the body)

export default function App() {
  
  const ES_HOST = "http://" + process.env.REACT_APP_ES_HOST + ":9200";
  const ES_SEARCH_URL = ES_HOST + "/ebooks/_search/";

  const history = useHistory();
  // key to search for
  const [searchWord, setSearchWord] = useState('');
  // regex or not
  const [regex, setRegex] = useState(false);
  // options for the autocomplete
  const [options, setOptions] = useState([]);
  // search event
  const onSearch = value => {
    history.push("/");
    setSearchWord(value);
  };
  // regex checkbox change
  const onRegexChange = e => {
    setRegex(e.target.checked);
  };
  // search input change for the autocomplete
  const handleSearch = (value) => {
    if (value)
      axios.post(ES_SEARCH_URL, {
        suggest: {
          ebooksuggest: {
            prefix: value,
            completion: {
              field: "title_suggest",
            }
            
          }
        }
      })
        .then(function (response) {
          let options = response.data.suggest.ebooksuggest[0].options;
          let values = [];
          options.forEach(element => {
            values.push({ value: element._source.title });
          });
          // set autocomplete options
          setOptions([{options:values, label:'Book titles'}]);
        })
        .catch(function (error) {
          console.log(error);
        })

  };


  return (
    <div style={{ padding: '16px' }}>
      <Divider orientation="left">Welcome to Booklib a Gutenberg project clone</Divider>
      <Row justify="center">
        <Space>
          <Col>
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{ width: 400 }}
              options={options}
              onSelect={onSearch}
              onSearch={handleSearch}
            >
              <Input.Search onSearch={onSearch} size="large" placeholder="Search for ebooks" enterButton />
            </AutoComplete>
          </Col>
          <Col>
            <Checkbox
              checked={regex}
              onChange={onRegexChange}
            >
              Regular expression
          </Checkbox>
          </Col>
        </Space>
      </Row>

      <div style={{ padding: '8px 0' }}>
        <Switch>
          <Route exact path="/">
            <Results search={searchWord} regex={regex} />
          </Route>
          <Route path="/ebook" component={Book} />

        </Switch>
      </div>

    </div>
  )
}