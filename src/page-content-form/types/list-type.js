import React from "react";
import { DataGrid, PageContentWrapper, Tabs } from "../components";
import { Checkbox, TextInput } from "../inputs";

export default function ListType() {
  return (
    <PageContentWrapper label={"List Config"}>
      <Tabs
        tabs={[
          { name: "Basic Config", child: <BasicConfig /> },
          { name: "Columns", child: <Columns /> },
        ]}
      />
    </PageContentWrapper>
  );
}
function BasicConfig() {
  return (
    <div className="flex flex-col gap-4">
      <TextInput label={"Route"} />
      <Checkbox label={"Disable Application ID in URL"} />
      <Checkbox label={"Filterable"} />
      <Checkbox label={"Sortable"} />
      <Checkbox label={"Resizable"} />
      <Checkbox label={"Pageable"} />
      <Checkbox label={"Reorderable"} />
      <PageContentWrapper label={"Paging Options"} width="w-full">
        <div className="flex gap-3  flex-wrap">
          <div className="flex-1">
            <TextInput label={"Button Count"} />
          </div>
          <div className="flex-1">
            <DataGrid>
              <TextInput label={"Button Count"} />
            </DataGrid>
          </div>
        </div>
      </PageContentWrapper>
    </div>
  );
}

function Columns() {
  return (
    <DataGrid>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 flex-wrap">
          <TextInput label={"Title"} />
          <TextInput label={"Field Key"} />
        </div>
        <div className="flex gap-2">
          <Checkbox label={"Filterable"} />
          <Checkbox label={"Sortable"} />
        </div>
      </div>
    </DataGrid>
  );
}
