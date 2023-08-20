import { useState } from "react";
import { SalaryForm } from "./components/SalaryForm";

function App() {
  const [salary, setSalary] = useState();
{/*
  function getSalary(salary) {
    setSalary(salary);

    return salary;
  }
*/}
  return (
    <>
      <SalaryForm /*getSalary={getSalary}*/ />
    </>
  );
}

export default App;
