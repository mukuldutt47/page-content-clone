import logo from "./logo.svg";
import "./App.css";
import PageContentForm from "./page-content-form/page-content-form";
import { createContext, useState } from "react";
import Modal from "./page-content-form/components/modal";
const FormContext = createContext({});
let pages = []
function map(pages, prev = []) {
  for (let page in pages) {
    if (typeof pages[page] === "object") {
      map(pages[page], [...prev, page]);
    } else {
      // console.log(prev, page, pages);
      if (pages?.type === "TabSegment") {
        // pages?.content
        pages?.content?.tabs?.forEach((v) => {
          v.content = [1];
        });
      }
    }
  }
}
function App() {
  const [modal, setModal] = useState();
  const [data, setData] = useState(pages);
  console.log(JSON.stringify(data))
  const [forms, setForms] = useState([
    {
      name: "abc",
      uuid: "12312321132312",
    },
    {
      name: "bca",
      uuid: "",
    },
  ]);

  const onDynamicUpdate = (key, targetKey, pageContentData) => {
    return ({ target }) => {
      const fields = `pageContentData.${key.join(".")}`.split(".");
      const parsedStr = parser(fields);
      let evalData = eval(parsedStr);
      evalData = target[targetKey || "value"];
      eval(`${parsedStr}= evalData`);
      setData([...data]);
    };
  };

  const getPages = () => {
    return [
      { label: "Select Page", uuid: null },
      ...data.map(({ uuid, name }) => {
        return { label: name, uuid };
      }),
    ];
  };

  return (
    <FormContext.Provider
      value={{
        setModal,
        data,
        setData,
        forms,
        onDynamicUpdate,
        getPages,
      }}
    >
      <PageContentForm />
      <Modal modal={modal} />
    </FormContext.Provider>
  );
}
function parser(fields) {
  fields = fields.map((v) => {
    const isNum = !isNaN(Number(v));
    return { value: isNum ? `[${v}]` : v, isNum };
  });
  let str = "";
  for (let i = 0; i < fields.length; i++) {
    const { value, isNum } = fields[i];
    str += value;
    if (i === fields.length - 1) continue;
    if (isNum) {
      str += (fields[i + 1]?.isNum && "") || ".";
    } else {
      str += fields[i + 1]?.isNum ? "" : ".";
    }
  }
  return str;
}
export { FormContext };
export default App;
