import React, { useState, useEffect } from 'react';
import { List, Card, Row, Col, Skeleton, Divider, Select, Typography, Space, Image, Avatar } from 'antd';
import { BookTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';



const backendURL = "http://localhost:8000/";
const frontendURL = "http://localhost:3000/";
const searchURL =  backendURL + "search/";
const ebookURL = frontendURL + "ebook/";
const elasticURL = "http://localhost:9200/ebooks/_search/"


const { Meta } = Card;

function Results(props) {
    const [books, setBooks] = useState([]);
    const [spell, setSpell] = useState('');
    const [neighbors, setNeighbors] = useState(null);
    const [sort, setSort] = useState(false);
    const [loading, setLoading] = useState(true);

    const { Option } = Select;
    const { Text } = Typography;

    function handleOrderChange(value) {
        if (value === 'title') { setSort(false) } else { setSort(true) }

    }

    useEffect(() => {
        if (props.search) {
            let params = { params: { regex: props.regex, key: props.search } }
            axios.get(searchURL, params)
                .then(function (response) {
                    setBooks(response.data.result);
                    setNeighbors(response.data.neighbors);
                    setLoading(false);
                    if (response.data.result.length === 0){
                        axios.post(elasticURL, { 
                            suggest : { 
                             mytermsuggester : { 
                                text : props.search, 
                                term : { 
                                   field : "title"
                                 } 
                              } 
                            } 
                          })
                        .then(function(response){
                            let options = response.data.suggest.mytermsuggester[0].options;                    
                            options.length > 0 ? setSpell(options[0].text) : setSpell('');
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                    }
                    else{
                        setSpell('');
                    }
                        
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            setSpell('');
            axios.get(backendURL)
                .then(function (response) {
                    setBooks(response.data);
                    setNeighbors(null);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }, [props.search, props.regex]);

    function compareEbooksByTitle(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        let comparison = 0;
        if (titleA > titleB) {
            comparison = 1;
        } else if (titleA < titleB) {
            comparison = -1;
        }
        return comparison;
    }

    return (
        <div>
            <Divider />
            <Row gutter={32} justify="center">

                <Space direction="vertical" style={{ width: '848px' }}>
                    <Row justify="space-between">
                        <Col><Text strong>{props.search ? `Results for: "${props.search}"` : `Home`}</Text></Col>
                        <Col>
                            <Text strong>Sort by: </Text>
                            <Select defaultValue="title" style={{ width: 120 }} onChange={handleOrderChange}>
                                <Option value="title">Title</Option>
                                <Option value="relevance">Relevance</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <List
                                grid={{ gutter: 16 }}
                                dataSource={sort ? [...books].sort((a, b) => a.rank - b.rank) : [...books].sort(compareEbooksByTitle)}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={{
                                            pathname: "/ebook/" + item.id,
                                            book: item
                                        }} >
                                            <Card
                                                loading={loading}
                                                hoverable
                                                style={{ width: 200, borderRadius: "10px" }}
                                                cover={
                                                    <Image
                                                        style={{ borderRadius: "10px 10px 0 0", height: "298px" }}
                                                        alt={"book_" + item.id + "_cover"}
                                                        src={item.cover_url}
                                                        fallback="data:image/png;base64,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"

                                                    />
                                                }

                                            >
                                                <Skeleton loading={loading} active>
                                                    <Meta
                                                        title={item.title}
                                                        description={item.authors.split("/")}
                                                    />
                                                </Skeleton>
                                            </Card>
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                    {spell ? <Text strong> Did you mean: <Link > {spell}</Link></Text> : <div></div> }
                    
                </Space>
                <Col flex='300px'>
                    {
                        neighbors ? <div><Divider orientation="left">You may also like</Divider>
                            <List
                                itemLayout="horizontal"
                                dataSource={neighbors}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar style={{
                                                backgroundColor: '#ffffff'
                                            }} icon={<BookTwoTone />} />}
                                            title={<a href={ebookURL + item.id}>{item.title}</a>}
                                            description={item.authors.split("/")}
                                        />
                                    </List.Item>
                                )}
                            /></div> : <div></div>

                    }

                </Col>
            </Row>
        </div>
    );
}

export default Results;