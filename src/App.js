
import { useState } from 'react';
import './App.css';
import Checkbox from './components/Checkbox';
import usePasswordGenerator from './hooks/use-password-generator';
import Button from './components/Button';
import PasswordStrengthIndicator from './components/StrengthChecker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length,setLength]=useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy=()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password Copied");
    setTimeout(() => {
      setCopied(false);
    }, 1000);

  }


  const {password,errorMessage,generatePassword}=usePasswordGenerator();

  return (
    <div className="container">
      {password && (<div className='header'>
        <div className='title'>Password:{password}</div>
        <Button
            text={copied ? "Copied" : "copy"}
            onClick={handleCopy}
            customClass="copyBtn"
          />
      </div>)}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              onChange={() => handleCheckboxChange(index)}
              state={checkbox.state}
            />
          );
        })}
      </div>
      <PasswordStrengthIndicator password={password} />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Button
        text="Generate Password"
        onClick={() => generatePassword(checkboxData, length)}
        customClass="generateBtn"
      />
       <ToastContainer
            position="top-center"
         />
    </div>
  );
}

export default App;
