import logo from "./logo.svg";
import "./App.css";
import PageContentForm from "./page-content-form/page-content-form";
import { createContext, useState } from "react";
import Modal from "./page-content-form/components/modal";
const FormContext = createContext({});
let pages = [
  {
    uuid: "123",
    name: "page1",
    description: "description",
    content: [
      {
        type: "Form",
        content: {},
      },
      {
        type: "RenderButtons",
        content: {
         buttonList : [{
          icon : 'abc',
          rule : 'true',
          details : [{form_id : 'form', type : 'form'}]
         }]
        },
      },
    ],
  },
];
function App() {
  const [modal, setModal] = useState();
  const [data, setData] = useState(pages);
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
  const updateObject = (key, field, value, original) => {
    try {
      field[key] = value;
      setData([...original]);
    } catch (e) {}
  };

  const onDynamicUpdate = (key, targetKey, pageContentData) => {
    return ({ target }) => {
      const fields = `pageContentData.content.${key.join(".")}`.split(".");
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
        updateObject,
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
