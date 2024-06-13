import { useState } from "react";
import { toast } from "react-toastify";

const usePasswordGenerator=()=>{

    const [password,setPassword]=useState("");
    const [errorMessage,setErrorMessage]=useState("");

    const generatePassword=(checkboxData,length)=>{

        let charset="";
        let generatedPassword="";

        const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option.");
      setPassword("");
      toast.error("Please Select Atleast One of option");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "0123456789";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }
  
      setPassword(generatedPassword);
      setErrorMessage("");

      toast.success("Paasword has been generated");
    

    };

    return {password,errorMessage,generatePassword};

};

export default usePasswordGenerator;