import React, { useEffect } from "react";
import { PageContentWrapper, Tabs } from "../../components";
import ActionButtons from "./action-buttons";
import BasicConfig from "./basic-config";
import Columns from "./columns";
import DefaultFilters from "./default-filters";

export default function ListType({ pageContentData }) {
  useEffect(() => {
    if (!pageContentData.content) {
      pageContentData.content = {};
    }
  }, []);
  return (
    <PageContentWrapper label={"List Config"}>
      <Tabs
        tabs={[
          {
            name: "Basic Config",
            child: <BasicConfig pageContentData={pageContentData} />,
          },
          {
            name: "Columns",
            child: <Columns pageContentData={pageContentData} />,
          },
          {
            name: "Action Buttons",
            child: <ActionButtons pageContentData={pageContentData} />,
          },
          {
            name: "Default Filters",
            child: <DefaultFilters pageContentData={pageContentData} />,
          },
        ]}
      />
    </PageContentWrapper>
  );
}
