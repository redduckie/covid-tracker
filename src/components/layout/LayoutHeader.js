import React from "react";
import { Link } from "react-router-dom";

const LayoutHeader = ({ Header, Menu, selectedKey }) => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="/">
          <Link to="/" />
          Map
        </Menu.Item>
        <Menu.Item key="/CountryStats">
          <Link to="/CountryStats" />
          Country Stats
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default LayoutHeader;
