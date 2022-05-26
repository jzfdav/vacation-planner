import { useState } from 'react';
import './App.css';

function App() {

  const [vacations, setVacations] = useState([{
    vacationid: crypto.randomUUID(),
    vacationist: "John Doe",
    vacationStartDate: "2021-04-24",
    vacationEndDate: "2021-04-24"
  }]);
  const [vacationid, setVacationid] = useState("");
  const [vacationist, setVacationist] = useState("");
  const [vacationStartDate, setVacationStartDate] = useState("");
  const [vacationEndDate, setVacationEndDate] = useState("");
  const [validationMessage, setValidationMessage] = useState("Enter your vacation details");
  const [validationStyle, setValidationStyle] = useState(" w3-green ");

  const ResetForm = () => {
    setVacationid("");
    setVacationist("");
    setVacationStartDate("");
    setVacationEndDate("");
    setValidationMessage("Enter your vacation details");
    setValidationStyle(" w3-green ");
  };

  const datesAreInvalid = (startDate, endDate) => {
    if (startDate > endDate) {
      setValidationMessage("Oh no! Your vacation ends before it starts!");
      setValidationStyle(" w3-red ");
      return true;
    }
    setValidationStyle(" w3-green ");
    return false;
  }

  const SubmitVacationPlan = (e) => {
    e.preventDefault();

    const startDate = new Date(vacationStartDate);
    const endDate = new Date(vacationEndDate);

    if (datesAreInvalid(startDate, endDate)) {
      return;
    }

    let newVacationid = "";
    if (!vacationid) {
      newVacationid = crypto.randomUUID();
      console.log('Generated new vacation id', newVacationid);
    }

    const vacation = {
      vacationid: newVacationid ? newVacationid : vacationid,
      vacationist: vacationist,
      vacationStartDate: vacationStartDate,
      vacationEndDate: vacationEndDate
    };

    let tmpVacations = [...vacations];
    if (newVacationid === "") {
      const id = tmpVacations.findIndex((v) => v.vacationid === vacation.vacationid);
      tmpVacations.splice(id, 1);
    }

    tmpVacations = [vacation, ...tmpVacations]
    tmpVacations.sort((a, b) => a.vacationStartDate - b.vacationStartDate);
    setVacations(tmpVacations);
    ResetForm();
  };

  // load the form with this data
  const EditVacation = (e) => {
    const targetId = e.target.parentNode.parentNode.id;
    const eVacation = vacations.find((vacation) => vacation.vacationid === targetId);
    setVacationid(eVacation.vacationid);
    setVacationist(eVacation.vacationist);
    setVacationStartDate(eVacation.vacationStartDate);
    setVacationEndDate(eVacation.vacationEndDate);
  }

  const DeleteVacation = (e) => {
    const targetId = e.target.parentNode.parentNode.id;
    let tmpVacations = [...vacations];
    const id = tmpVacations.findIndex((vacation) => vacation.vacationid === targetId);
    tmpVacations.splice(id, 1);
    setVacations(tmpVacations);
  }

  return (
    <div>
      <h1><u>Plan your vacation</u></h1>
      <div>
        <form className='w3-panel w3-round w3-border-teal' onSubmit={SubmitVacationPlan} onReset={ResetForm}>
          <fieldset>
            <legend>Vacation details</legend>
            <div>
              <label>Name: </label>
              <input required className='w3-input' value={vacationist} onChange={(e) => setVacationist(e.target.value)} placeholder="John Doe"></input>
            </div>
            <div>
              <label>Start date: </label>
              <input required type="date" className='w3-input' value={vacationStartDate} onChange={(e) => setVacationStartDate(e.target.value.toString())}></input>
            </div>
            <div>
              <label>End date: </label>
              <input required type="date" className='w3-input' value={vacationEndDate} onChange={(e) => setVacationEndDate(e.target.value.toString())}></input>
            </div>
          </fieldset><p className={"validation-message " + validationStyle}>{validationMessage}</p><br />
          <button className='w3-btn w3-teal w3-round'>Submit vacation plan</button>
        </form>
      </div>
      <hr />
      <h1><u>Upcoming Vacations</u></h1>
      <div className="vacation-list">
        {vacations.map((vacation, key) => {
          return (
            <div className='vacation-item w3-card w3-round' key={key} id={vacation.vacationid}>
              <div className="vacation-item-details">
                <h3 className="vacationist">{vacation.vacationist}</h3>
                <h4>{vacation.vacationStartDate} to {vacation.vacationEndDate}</h4>
                <p className='vacationid'>Vacation ID: {vacation.vacationid}</p>
                {/*
                <div className="vacation-start-date">Start: {vacation.vacationStartDate}</div>
                <div className="vacation-end-date">End: {vacation.vacationEndDate}</div>
                */}
              </div>
              <div className='vacation-item-actions'>
                <button className='w3-btn w3-teal w3-round' onClick={EditVacation}>Edit</button>
                <button className='w3-btn w3-red w3-round' onClick={DeleteVacation}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
