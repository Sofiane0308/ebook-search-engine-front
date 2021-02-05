import React, { useState } from 'react';
import './App.css';
import Results from './Results';
import Book from './Book';
import { Row, Col, Divider, Input, Checkbox, Space, AutoComplete } from 'antd';
import { Switch, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import axios from 'axios';


const { Search } = Input;

const elasticURL = "http://192.168.1.4:9200/ebooks/_search/"


export default function App() {
  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');
  const [regex, setRegex] = useState(false);
  const [options, setOptions] = useState([]);
  const onSearch = value => {
    history.push("/");
    setSearchWord(value);
  };
  const onChange = e => {
    setRegex(e.target.checked);
  };
  const handleSearch = (value) => {
    if (value)
      axios.post(elasticURL, {
        suggest: {
          ebooksuggest: {
            prefix: value,
            completion: {
              field: "title_suggest",
              /*fuzzy: {
                fuzziness: 2
              }*/
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
              onChange={onChange}
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