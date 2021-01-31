import React, { useState } from 'react';
import './App.css';
import Results from './Results';
import Book from './Book';
import { Row, Col, Divider, Input, Checkbox, Space } from 'antd';
import { Switch, Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const { Search } = Input;



export default function App() {
  const history = useHistory();
  const [searchWord, setSearchWord] = useState('');
  const [regex, setRegex] = useState(false);
  const onSearch = value => {
    history.push("/");
    setSearchWord(value);
  };
  const onChange = e => {
    setRegex(e.target.checked);
  };

  return (
    <div style={{ padding: '16px' }}> 
      <Divider orientation="left">Welcome to Booklib a Gutenberg project clone</Divider>
      <Row justify="center">
        <Space>
        <Col style={{width:'350px'}}>
          <div>
            <Search
              placeholder="Search for ebooks"
              allowClear
              enterButton
              size="large"
              loading={false}
              onSearch={onSearch}
            />
          </div>
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
            <Results search={searchWord} regex={regex}/>
          </Route>
          <Route path="/ebook" component={Book} />

        </Switch>
      </div>

    </div>
  )
}