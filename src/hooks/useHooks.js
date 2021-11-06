// import React from "react";

export const alphabetsOnly = () => {
  const errorText = new SpeechSynthesisUtterance('alphabets only');
  errorText.rate = 1;
  speechSynthesis.speak(errorText);
  
};

