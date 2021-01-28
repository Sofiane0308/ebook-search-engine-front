<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col><Space ><div style={{ width: '130px' }}><Text strong>Realease date</Text></div><div style={{ width: '130px' }}><Text style={{ color: "grey" }} strong>{book.release_date}</Text></div></Space></Col>
                                <Col><Space ><div style={{ width: '130px' }}><Text strong>Subjects</Text></div><div style={{ width: '130px' }}><Text  ellipsis={{rows: 3, expandable:true}} style={{ color: "grey" }} strong>{book.subjects}</Text></div></Space></Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col><Space ><div style={{ width: '130px' }}><Text strong>Downloads</Text></div><div style={{ width: '130px' }}><Text style={{ color: "grey" }} strong>{book.download_count}</Text></div></Space></Col>
                                <Col><Space ><div style={{ width: '130px' }}><Text strong>Bookshelves</Text></div><div><Text ellipsis={{expandable:true}} style={{ color: "grey" }} strong>{book.bookshelves}</Text></div></Space></Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col><Space ><div style={{ width: '130px' }}><Text strong>Copyrights</Text></div><Text style={{ color: "grey" }} strong>{book.copyright}</Text></Space></Col>
                            </Row>