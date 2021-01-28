import React, { useState, useEffect } from 'react';
import { List, Card, Row, Col, Skeleton, Divider } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';




const { Meta } = Card;

function Results(props) {
    const [books, setBooks] = useState([]);
    const [sort, setSort] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let backendURL;
        let params = { params: { regex: props.regex } }
        if (props.search) {
            params.params.key = props.search;
            backendURL = "http://localhost:8000/search/";
        } else {
            backendURL = "http://localhost:8000/";
        }
        axios.get(backendURL, params)
            .then(function (response) {
                console.log(response.data);
                setBooks(response.data);
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [props.search, props.regex]);

    return (
        <div>
            <Divider orientation="left">{props.search ? `Results for: "${props.search}"` : `Home`}</Divider>
            <Row justify="space-between"></Row>
            <Row justify="center">
                <Col flex="864px">
                    <List
                        grid={{ gutter: 16 }}
                        dataSource={sort ? [...books].sort((a, b) => a.rank - b.rank) : books}
                        renderItem={item => (
                            <List.Item>
                                <Link to={{
                                    pathname: "/book",
                                    book: item
                                }} >
                                    <Card
                                        loading={loading}
                                        hoverable
                                        style={{ width: 200, borderRadius: "10px" }}
                                        cover={
                                            <img
                                                style={{ borderRadius: "10px 10px 0 0", height: "298px" }}
                                                alt={"book_" + item.id + "_cover"}
                                                src={item.cover_url}
                                            />
                                        }

                                    >
                                        <Skeleton loading={loading} active>
                                            <Meta
                                                title={item.title}
                                                description={item.authors}
                                            />
                                        </Skeleton>
                                    </Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Results;