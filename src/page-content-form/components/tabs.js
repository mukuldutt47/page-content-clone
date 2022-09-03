import React, { useState } from "react";

export default function Tabs({ children, activeTab, tabs = [] }) {
  //[]
  const active = "outline outline-1 outline-black";
  const defaultClass = "p-1 px-2 bg-blue-200 rounded-sm cursor-pointer";
  const [currentActiveTab, setCurrentActiveTab] = useState(
    activeTab || tabs[0]?.name
  );
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-wrap gap-2 top-0 sticky">
        {tabs.map((tab) => {
          return (
            <div
              className={`${defaultClass} ${
                tab.name === currentActiveTab && active
              }`}
              onClick={() => {
                setCurrentActiveTab(tab.name);
              }}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      {
        tabs
          .filter(({ child, name }) => {
            return name === currentActiveTab;
          })
          .map((v) => v.child)[0]
      }
    </div>
  );
}
