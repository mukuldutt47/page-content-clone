import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { DataGrid, PageContentWrapper } from "../components";
import { DropDown, TextInput } from "../inputs";

export default function TabsegmentType({ pageContentData }) {
  const context = useContext(FormContext);
  const update = (type, targetValue) => {
    return (e) => {
      context.updateObject(
        type,
        pageContentData,
        e.target[targetValue],
        context.data
      );
    };
  };
  useEffect(() => {
    // if (typeof pageContentData?.["page_id"] === "undefined") {
    //   update("page_id", "value")({ target: { value: "" } });
    // }
  }, []);
  return (
    <PageContentWrapper label={"Tab Segment"}>
      <DataGrid>
        <div className="flex gap-4">
          <TextInput
            label={"Tab Name"}
            // value={pageContentData.content?.["reactId"]}
            // onChange={update("reactId", "value")}
          />
          <DropDown
            label={"Pages"}
            data={[{ uuid: "", name: "" }, ...context.data]?.map((page) => {
              return { value: `${page.uuid}`, label: page.name };
            })}
            value={pageContentData["page_id"]}
            onChange={update("page_id", "value")}
          />
        </div>
      </DataGrid>
    </PageContentWrapper>
  );
}
