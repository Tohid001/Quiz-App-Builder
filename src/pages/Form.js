import React, { useState, useEffect, useCallback, createContext } from "react";

//import utility
import update from "immutability-helper";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useDidMountEffect from "../Hooks/úseDIdMount";

//importing my components
import {} from "../Components";

///importing ui's
import {} from "antd";

//importing data

import { v4 as uuidv4 } from "uuid";
import getCachedState from "../utils/getCachedState";

export const formContext = createContext(null);

function Form() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(
    getCachedState(`view-${quizId}`) || []
  );

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    localStorage.setItem(`view-${quizId}`, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const localQuizList = getCachedState("quizes");

    if (localQuizList) {
      const quizLocalIndex = localQuizList.findIndex((quiz, index) => {
        return quiz.id === quizId;
      });

      if (quizLocalIndex !== -1) {
        setQuestions(localQuizList[quizLocalIndex].quizQuestions);
      } else {
      }
    } else {
    }
  }, []);

  return <form>Form</form>;
}

export default Form;
