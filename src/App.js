import logo from "./logo.svg";
import "./App.css";
import PageContentForm from "./page-content-form/page-content-form";
import { createContext, useState } from "react";
import Modal from "./page-content-form/components/modal";
const FormContext = createContext({});
let pages = [
  {
    uuid: Math.random(),
    name: "page1",
    description: "description",
    content: [
      {
        type: "Form",
        content: {},
      },
      {
        type: "List",
        content: {},
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
  return (
    <FormContext.Provider value={{ setModal, data, setData, forms, updateObject}}>
      <PageContentForm />
      <Modal modal={modal} />
    </FormContext.Provider>
  );
}
export { FormContext };
export default App;
