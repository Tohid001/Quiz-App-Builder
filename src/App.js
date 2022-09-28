// import React, { useState } from "react";
// import "antd/dist/antd.css";
// // import './index.css';

// import { CaretRightOutlined } from "@ant-design/icons";
// import { SettingOutlined } from "@ant-design/icons";
// import { Collapse, Select } from "antd";

// const { Option } = Select;
// const { Panel } = Collapse;
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// const App = () => {
//   const [expandIconPosition, setExpandIconPosition] = useState("start");
//   const onChange = (key) => {
//     console.log(key);
//   };
//   const onPositionChange = (newExpandIconPosition) => {
//     setExpandIconPosition(newExpandIconPosition);
//   };
//   const genExtra = () => (
//     <SettingOutlined
//       onClick={(event) => {
//         // If you don't want click extra trigger collapse, you can prevent this:
//         event.stopPropagation();
//       }}
//     />
//   );

//   return (
//     <>
//       <Collapse
//         bordered={false}
//         accordion
//         onChange={onChange}
//         expandIcon={({ isActive }) => (
//           <CaretRightOutlined rotate={isActive ? 90 : 0} />
//         )}
//         expandIconPosition={expandIconPosition}
//       >
//         <Panel header="This is panel header 1" key="1" extra={genExtra()}>
//           <p>{text}</p>
//         </Panel>
//         <Panel header="This is panel header 2" key="2" extra={genExtra()}>
//           <p>{text}</p>
//         </Panel>
//         <Panel
//           showArrow={false}
//           header="This is panel header 3"
//           key="3"
//           extra={genExtra()}
//         >
//           <p>{text}</p>
//         </Panel>
//       </Collapse>
//       <br />
//       <span>Expand Icon Position: </span>
//       <Select
//         value={expandIconPosition}
//         style={{
//           margin: "0 8px",
//         }}
//         onChange={onPositionChange}
//       >
//         <Option value="start">start</Option>
//         <Option value="end">end</Option>
//       </Select>
//     </>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, QuizeFormm } from "./pages";

import "antd/dist/antd.css";
import { GlobalReset } from "./Global.styled";

// import Dummy from "./Dummy";

function App() {
  return (
    <>
      <GlobalReset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form/:formId" element={<QuizeFormm />} />
      </Routes>
    </>
  );
}

export default App;
