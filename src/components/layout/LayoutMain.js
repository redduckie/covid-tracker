import React from "react";
import { Layout, Menu } from "antd";
import { Switch, withRouter } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import LayoutContent from "./LayoutContent";
import LayoutFooter from "./LayoutFooter";
import MediaQuery from "react-responsive";
import { Button } from "antd-mobile";

const { Header, Footer } = Layout;
const LayoutMain = props => {
  return (
    <div>
      <MediaQuery query="(min-width:200px)">
        <Layout className="layout">
          <LayoutHeader
            Header={Header}
            Menu={Menu}
            selectedKey={props.location.pathname}
          />
          <Switch>
            <LayoutContent Content={Layout} />
          </Switch>
          <LayoutFooter Footer={Footer} />
        </Layout>
      </MediaQuery>
      <MediaQuery query="(max-width:800px)">
        <Button>Test</Button>
      </MediaQuery>
    </div>
  );
};
export default withRouter(LayoutMain);
