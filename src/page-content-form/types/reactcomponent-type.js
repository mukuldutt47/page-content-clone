import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function ReactComponentType({ pageContentData }) {
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
    if (typeof pageContentData["content"]?.["reactId"] === "undefined") {
      update("reactId", "value")({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"React Component"}>
      <TextInput
        label={"React Id"}
        value={pageContentData.content?.["reactId"]}
        onChange={update("reactId", "value")}
      />
    </PageContentWrapper>
  );
}
