import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function HTMLType({ pageContentData }) {
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
    if (typeof pageContentData["htmlContent"] === "undefined") {
      update("htmlContent", "value")({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"HTML Viewer"}>
      <TextInput
        label={"HTML Content"}
        value={pageContentData["htmlContent"]}
        onChange={update("htmlContent", "value")}
      />
    </PageContentWrapper>
  );
}
