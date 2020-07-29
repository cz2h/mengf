import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import ConnectedProgram from "./programs";
import Calanedar from "./calendar";
const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [collapsed, toggle] = useState(true);

  return (
    <div>
      <Provider store={store}>
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
                padding: 24,
                minHeight: 280,
              }}
            >
              <Calanedar />
            </Content>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              theme="light"
              width={350}
            >
              {collapsed ? "" : <div>{<ConnectedProgram />}</div>}
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
