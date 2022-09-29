export const ItemTypes = {
  QUESTION: "question",
};

export const newQuestion = {
  questiontext: "",
  questionType: "radio",
  questionimageUrl: "",
  options: [
    { optionText: "", optionImageUrl: "" },
    { optionText: "", optionImageUrl: "" },
  ],
  open: true,
  required: false,
};

export const initialQuizState = {
  quizeText: "",
  quizeDescription: "",

  quizQuestions: [
    {
      id: 1,
      questiontext: "",
      questionimageUrl: "",
      questionType: "radio",
      options: [
        { optionText: "", optionImageUrl: "" },
        { optionText: "", optionImageUrl: "" },
      ],
      open: true,
      required: false,
    },
  ],
};
