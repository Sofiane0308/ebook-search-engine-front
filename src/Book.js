import React, { useState, useEffect }from 'react';
import { Row, Col, Typography, Space, Button, Breadcrumb, Card, Descriptions, Divider } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import { GlobalOutlined, HomeOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Text } = Typography;



function Book(props) {

    const [book, setBook] = useState(null);
    let location = useLocation();

    
    useEffect(() => {
        let backendURL = 'http://localhost:8000' + location.pathname  ;
        
        
        axios.get(backendURL)
            .then(function (response) {
                console.log(response.data);
                setBook(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    
    return (

        <div>
            <Divider orientation="left"></Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col >
                    <Space direction="vertical" style={{width:'300px'}}>
                        <Breadcrumb >
                            <Breadcrumb.Item>
                                <Link to="/" ><HomeOutlined style={{ fontSize: 24 }} /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {book ? book.title : ''}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Space direction="vertical">
                        <a target="_blank" href={book ? book.content_url : ''}>
                            <Card
                                hoverable
                                style={{ borderRadius: "25px", width: "300px", height: "400px" }}
                                cover={
                                    <img
                                        alt={"book_" + "_cover"}
                                        style={{ borderRadius: "25px", width: "300px", height: "400px" }}
                                        src={book ? book.cover_url: ''}
                                    />
                                }
                            >
                            </Card>
                        </a>
                        <a target="_blank" href={book ? book.content_url : ''}>
                            <Button style={{ borderRadius: "10px", height: "48px" }} type="primary" block>
                                <Text style={{ color: "white" }} strong>Read book</Text>
                            </Button>
                        </a>
                        </Space>
                        <Row justify="center">
                            <Space style={{ fontSize: 22 }}>
                                <GlobalOutlined />
                                <Text strong> {book ? book.languages.split("/").splice(1).join(" & "):''}</Text>
                            </Space>
                        </Row>

                    </Space>

                </Col>
                <Col >
                    <Space size={32} direction="vertical" style={{width:'1000px'}}>

                        <Space direction="vertical">
                            <Text style={{
                                fontSize: "2.75rem",
                                lineHeight: "3.5625rem",
                                letterSpacing: "0.028125rem"
                            }} level={2} strong> {book ? book.title : ''}</Text>
                            <Text style={{
                                fontSize: "1.375rem",
                                lineHeight: "1.9375rem",
                                letterSpacing: "0.019375rem",
                                color: "grey"
                            }} strong>{book ? book.authors.split("/").map((e) => { return (<div>{e}</div>) }):''}</Text>
                        </Space>
                        <Space style={{ fontSize: "1.25rem" }} direction="vertical">

                            <Descriptions title="Book information" bordered contentStyle={{ fontSize: 16, fontWeight: "500" }}>
                                <Descriptions.Item label="Realease">{book ? book.release_date : ''}</Descriptions.Item>
                                <Descriptions.Item label="Downloads">{book ? book.download_count : ''}</Descriptions.Item>
                                <Descriptions.Item label="Copyrights" >{book ? book.copyright : ''}</Descriptions.Item>
                                <Descriptions.Item label="Subjects" span={3}>
                                    {book ? book.subjects.split("/").map((e) => { return (<div>{e}</div>) }):''}
                                </Descriptions.Item>
                                <Descriptions.Item label="Shelves" >{book ? book.bookshelves.split("/").map((e) => { return (<div>{e}</div>) }):''}</Descriptions.Item>

                            </Descriptions>

                        </Space>
                    </Space>

                </Col>
            </Row>
        </div >);
}

export default Book;