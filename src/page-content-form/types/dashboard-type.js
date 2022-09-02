import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function DashboardType({ pageContentData }) {
  const context = useContext(FormContext);
  const update = (type, targetValue) => {
    return (e) => {
      context.updateObject(
        type,
        pageContentData.content,
        e.target[targetValue],
        context.data
      );
    };
  };
  useEffect(() => {
    if (typeof pageContentData["content"]?.["htmlContent"] === "undefined") {
      update("uuid", "value")({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"HTML Viewer"}>
      <TextInput
        label={"Dashboard UUID"}
        value={pageContentData.content?.["uuid"]}
        onChange={update("uuid", "value")}
      />
    </PageContentWrapper>
  );
}
