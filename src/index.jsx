import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Row, Col } from 'antd';
import { ToDo } from './components/ToDo';
const { Header, Footer, Content } = Layout;

const App = () => {
    return (
        <Layout>
            <Header></Header>
            <Content>
                <Row>
                    <Col span={12} offset={6}>
                         <ToDo />
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));