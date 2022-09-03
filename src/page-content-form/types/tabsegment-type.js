import React from "react";
import { FormContext } from "../../App";
import { DataGrid, PageContentWrapper } from "../components";
import { DropDown, TextInput } from "../inputs";
const { useContext, useEffect } = React;
export default function TabsegmentType({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, data } = context;
  useEffect(() => {
    if (!pageContentData?.["content"]?.tabs) {
      pageContentData["content"] = {
        tabs: [
          {
            name: "",
            content: {},
          },
        ],
      };
      setData([...context.data]);
    }
  }, []);
  const onRemove = (index) => {
    pageContentData["content"].tabs = pageContentData["content"].tabs.filter(
      (_, i) => i != index
    );
    setData([...context.data]);
  };
  const onAdd = () => {
    pageContentData["content"].tabs.push({
      name: "",
      content: {},
    });
    setData([...context.data]);
  };
  const updateTabData = (tabIndex, type, value) => {
    try {
      pageContentData["content"].tabs[tabIndex][type] = value;
      setData([...context.data]);
    } catch (e) {}
  };
  return (
    <PageContentWrapper label={"Tab Segment"}>
      <DataGrid onAdd={onAdd} onRemove={onRemove}>
        {pageContentData?.content?.tabs?.map((tab, index) => {
          return (
            <Node
              index={index}
              pageContentData={pageContentData}
              updateTabData={updateTabData}
              context={context}
              tab={tab}
            />
          );
        })}
      </DataGrid>
    </PageContentWrapper>
  );
}

function Node(props) {
  const { index, pageContentData, updateTabData, context, tab = {} } = props;
  return (
    <div className="flex gap-4 flex-wrap" key={`${index}-123`}>
      <TextInput
        label={"Tab Name"}
        value={tab.name}
        onChange={(e) => {
          updateTabData(index, "name", e.target.value);
        }}
      />
      <DropDown
        label={"Pages"}
        data={[{ name: "", uuid: "" }, ...context.data]?.map((page) => {
          return { value: `${page.uuid}`, label: page.name };
        })}
        value={tab?.content?.page_id}
        onChange={(e) => {
          updateTabData(index, "content", {
            type: "Page",
            page_id: e.target.value,
          });
        }}
      />
    </div>
  );
}
