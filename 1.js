import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [inputFields, setInputFields] = useState([
    { firstName: '', lastName: '' }
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else {
      values[index].lastName = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  return (
    <>
      <h1>Dynamic Form Fields in React</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={inputField.firstName} onChange={event => handleInputChange(index, event)}/>
              </div>
              <div className="form-group col-sm-4">
                <label htmlFor="lastName">Last Name</label>
                <input type="text"  className="form-control"  id="lastName" name="lastName" value={inputField.lastName} onChange={event => handleInputChange(index, event)}/>
              </div>
              <div className="form-group col-sm-2">
                <button className="btn btn-link" type="button" onClick={() => handleRemoveFields(index)}>
                  -
                </button>
                <button className="btn btn-link" type="button" onClick={() => handleAddFields()}>
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
        <br/>
        <pre>
          {JSON.stringify(inputFields, null, 2)}
        </pre>
      </form>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
