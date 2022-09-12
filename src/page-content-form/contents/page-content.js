import React, { useContext, useEffect, useMemo, useState } from "react";
import { FormContext } from "../../App";
import { DropDown } from "../inputs";
import {
  CommentType,
  DashboardType,
  FormType,
  HistoryType,
  HTMLType,
  ListType,
  PageType,
  ReactComponentType,
  RenderButtons,
  TabsegmentType,
} from "../types";
import AttachmentType from "../types/attachment-type";
class Types {
  static FORM = "Form";
  static LIST = "List";
  static HTML = "HTML";
  static DASHBOARD = "Dashboard";
  static REACT_COMPONENT = "ReactComponent";
  static COMMENTS = "Comments";
  static ATTACHMENT = "Attachments";
  static HISTORY = "History";
  static PAGE = "Page";
  static TAB_SEGMENT = "TabSegment";
  static RENDER_BUTTONS = "RenderButtons";
}
export default function PageContent({ pageContentData, parentId }) {
  const [id, SetContentId] = useState(null);
  // console.log(pageContentData)
  // useMemo(() => {
  //   return ;
  // }, [])
  const context = useContext(FormContext);
  // let pageContentData = context?.data?.[pageIndex]?.content?.[contentTypeIndex];
  const pageContent = {
    component: getComponent(pageContentData.type),
    value: pageContentData.type,
  };
  useEffect(() => {
    if (pageContentData?.type?.length > 0) {
      context.setModal?.({
        typeId: Math.random(),
        data: (
          <pageContent.component
            pageContentData={pageContentData}
            parentId={id}
          />
        ),
        id,
      });
    }
  }, [pageContentData.type, id]);
  useEffect(() => {
    if (!id) {
      SetContentId(`${Math.random()}${parentId ? `_${parentId}` : ""}`);
    }
    return () => {
      // if (id) {
      context.setModal?.({
        remove: Math.random(),
        id,
      });
      // }
    };
  }, [id]);
  useEffect(() => {
    return () => {
      context.setModal?.({
        remove: Math.random(),
        id,
      });
    };
  }, [pageContentData.type]);
  const onChangeType = (type) => {
    return (e) => {
      if (type === "type") {
        for (let key in pageContentData) {
          if (!["content", "type"].includes(key)) {
            delete pageContentData[key];
          }
        }
      }
      pageContentData[type] = e.target.value;
      context.setData([...context.data]);
    };
  };
  return (
    <div className="flex gap-2 flex-col flex-1" id={id}>
      <DropDown
        validation={{}}
        label={"Content Type"}
        onChange={(e) => {
          if (e.target.value === "") {
            context.setModal?.({
              remove: Math.random(),
              id,
            });
          }
          onChangeType("type")(e);
        }}
        value={pageContent.value}
        data={[
          { label: "", value: "" },
          { label: Types.FORM, value: Types.FORM },
          { label: Types.LIST, value: Types.LIST },
          { label: Types.DASHBOARD, value: Types.DASHBOARD },
          { label: Types.HTML, value: Types.HTML },
          { label: Types.REACT_COMPONENT, value: Types.REACT_COMPONENT },
          { label: Types.COMMENTS, value: Types.COMMENTS },
          { label: Types.ATTACHMENT, value: Types.ATTACHMENT },
          { label: Types.HISTORY, value: Types.HISTORY },
          { label: Types.PAGE, value: Types.PAGE },
          { label: Types.TAB_SEGMENT, value: Types.TAB_SEGMENT },
          { label: Types.RENDER_BUTTONS, value: Types.RENDER_BUTTONS },
        ]}
      />
      {pageContent.component && (
        <div
          onClick={(e) => {
            console.log(e);
            setTimeout(() => {
              context.setModal?.({
                toggleModal: { value: true, id },
                toggle: Math.random(),
              });
            });
          }}
          className="flex justify-center border border-gray-300 p-2 rounded-md cursor-pointer text-sm hover:bg-gray-500 hover:text-cyan-50"
        >
          {`Select ${pageContent.value}`}
        </div>
      )}
    </div>
  );
}
function getComponent(value) {
  switch (value) {
    case Types.FORM:
      return FormType;
    case Types.LIST:
      return ListType;
    case Types.HTML:
      return HTMLType;
    case Types.DASHBOARD:
      return DashboardType;
    case Types.REACT_COMPONENT:
      return ReactComponentType;
    case Types.COMMENTS:
      return CommentType;
    case Types.ATTACHMENT:
      return AttachmentType;
    case Types.HISTORY:
      return HistoryType;
    case Types.PAGE:
      return PageType;
    case Types.TAB_SEGMENT:
      return TabsegmentType;
    case Types.RENDER_BUTTONS:
      return RenderButtons;
  }
}
