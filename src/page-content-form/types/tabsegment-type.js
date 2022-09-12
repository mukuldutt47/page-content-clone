import React from "react";
import { FormContext } from "../../App";
import { DataGrid, PageContentWrapper } from "../components";
import { PageContent } from "../contents";
import { DropDown, TextInput } from "../inputs";
const { useContext, useEffect } = React;
export default function TabsegmentType({ pageContentData, parentId }) {
  const context = useContext(FormContext);
  const { setData, data } = context;
  useEffect(() => {
    if (!pageContentData?.["content"]?.tabs) {
      pageContentData["content"] = {
        tabs: [
          {
            name: "",
            content: [
              {
                content: {},
              },
            ],
          },
        ],
      };
      setData([...context.data]);
    }
  }, [pageContentData?.["content"]]);
  const onRemove = (index) => {
    pageContentData["content"].tabs = pageContentData["content"].tabs.filter(
      (_, i) => i != index
    );
    setData([...context.data]);
  };
  const onAdd = () => {
    pageContentData["content"].tabs.push({
      name: "",
      content: [
        {
          content: {},
        },
      ],
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
              parentId={parentId}
            />
          );
        })}
      </DataGrid>
    </PageContentWrapper>
  );
}

function Node(props) {
  const {
    index,
    pageContentData,
    updateTabData,
    context,
    tab = {},
    parentId,
  } = props;
  return (
    <div className="flex gap-4 flex-wrap" key={`${index}-123`}>
      <TextInput
        label={"Tab Name"}
        value={tab.name}
        onChange={(e) => {
          updateTabData(index, "name", e.target.value);
        }}
      />
      <PageContent pageContentData={tab.content[0]} parentId={parentId} />;
    </div>
  );
}
