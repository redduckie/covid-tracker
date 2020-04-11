import React from "react";
import AppRouter from '../../AppRouter';

const LayoutContent = ({ Content }) => {
  return (
    <Content style={{ padding: "2%" }}>
      <div className="site-layout-content">
        <AppRouter />
      </div>
    </Content>
  );
};

export default LayoutContent;
