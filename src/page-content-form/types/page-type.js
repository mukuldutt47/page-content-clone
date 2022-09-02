import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { DropDown, TextInput } from "../inputs";

export default function PageType({ pageContentData }) {
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
    if (typeof pageContentData?.["page_id"] === "undefined") {
      update("page_id", "value")({ target: { value: "" } });
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
        onChange={update("page_id", "value")}
      />
    </PageContentWrapper>
  );
}
