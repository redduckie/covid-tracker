import React from "react";
import { Layout, Menu } from "antd";
import { Switch, withRouter } from "react-router-dom";
import LayoutHeader from "./LayoutHeader";
import LayoutContent from "./LayoutContent";
import LayoutFooter from "./LayoutFooter";
const { Header, Footer } = Layout;
const LayoutMain = props => {
  return (
    <div>
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
    </div>
  );
};
export default withRouter(LayoutMain);
