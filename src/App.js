import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";
import { Provider } from "react-redux";
import { sotre } from "./redux/store";

import Program from "./programs";
const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [collapsed, toggle] = useState(true);

  return (
    <div>
      <Provider store={sotre}>
        <Layout style={{ height: "100vh" }}>
          <Header style={{ color: "#fff" }}>
            <Row>
              <Col span={23}>Course Manager + Degree Explorer for ECE.Meng</Col>
              <Col span={1}>
                <span className="trigger" onClick={(e) => toggle(!collapsed)}>
                  Programs
                </span>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Sider trigger={null} theme="light">
              <div className="logo" />
              This is the courses component
            </Sider>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              This is where the time table sits
            </Content>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
              width={350}
            >
              {collapsed ? <div>{"Collapsed "}</div> : <div>{<Program />}</div>}
            </Sider>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            <a href="https://github.com/zengchu2">
              <GithubOutlined />
              {"Source Code"}
            </a>
          </Footer>
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
