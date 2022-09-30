import { v4 as uuidv4 } from "uuid";

export const ItemTypes = {
  QUESTION: "question",
};

export const newQuestion = {
  questiontext: "",
  questionType: "radio",
  questionimageUrl: "",
  options: [
    { optionText: "", optionImageUrl: "", isCorrect: false, id: uuidv4() },
    { optionText: "", optionImageUrl: "", isCorrect: false, id: uuidv4() },
  ],
  open: true,
  points: 0,
};

export const newOption = {
  optionText: "",
  optionImageUrl: "",
  isCorrect: false,
};

export const initialQuizState = {
  quizeText: "",
  quizeDescription: "",

  quizQuestions: [
    {
      id: uuidv4(),
      questiontext: "",
      questionimageUrl: "",
      questionType: "radio",
      options: [
        { optionText: "", optionImageUrl: "", isCorrect: false, id: uuidv4() },
        { optionText: "", optionImageUrl: "", isCorrect: false, id: uuidv4() },
      ],
      open: true,
      points: 0,
    },
  ],
};
