import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { DropDown, TextInput } from "../inputs";

export default function PageType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData?.["page_id"] === "undefined") {
      onDynamicUpdate(
        ["page_id"],
        null,
        pageContentData
      )({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"Page"}>
      <DropDown
        label={"Pages"}
        data={[{ uuid: "", name: "" }, ...context.data]?.map((page) => {
          return { value: `${page.uuid}`, label: page.name };
        })}
        value={pageContentData["page_id"]}
        onChange={onDynamicUpdate(["page_id"], null, pageContentData)}
      />
    </PageContentWrapper>
  );
}
