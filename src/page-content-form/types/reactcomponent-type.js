import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function ReactComponentType({ pageContentData }) {
  const context = useContext(FormContext);
  const { setData, onDynamicUpdate } = context;
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
    if (!pageContentData["content"]?.["reactId"]) {
      pageContentData["content"] = {};
      setData([...context.data]);
      // onDynamicUpdate(
      //   ["reactId"],
      //   null,
      //   pageContentData
      // )({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"React Component"}>
      <TextInput
        label={"React Id"}
        value={pageContentData.content?.["reactId"]}
        onChange={onDynamicUpdate(["reactId"], null, pageContentData)}
      />
    </PageContentWrapper>
  );
}
