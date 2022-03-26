import { goalModalProps } from "data";
import React, { useReducer } from "react";

export const goalFormTypes = {
  FIXED_INCOME: "FIXED_INCOME",
  START_BUSINESS: "START_BUSINESS",
  SCHOOL: "SCHOOL",
  TRAVEL: "TRAVEL",
  WEDDING: "WEDDING",
  OWN_HOME: "OWN_HOME",
  RENT: "RENT",
};

const goalFormQuestions = {
  FIXED_INCOME: {
    title: "Plan Name",
    questionOne: "Give your plan a name?",
    questionTwo: "When should this plan end?",
    questionThree: "How much is your target?",
  },
  START_BUSINESS: {
    title: "Plan Name",
    questionOne: "What is the name of your business?",
    questionTwo: "When do you want to start your business?",
    questionThree: "How much do you need for your business?",
  },
  SCHOOL: {
    title: "School Name",
    questionOne: "What school would you like to attend?",
    questionTwo: "When do you want to resume school?",
    questionThree: "How much do you need ?",
  },

  TRAVEL: {
    title: "Destination",
    questionOne: "Where is your travel Destination?",
    questionTwo: "When do you want to travel?",
    questionThree: "How much would the trip cost?",
  },
  WEDDING: {
    title: "Wedding Name",
    questionOne: "Give your wedding a name",
    questionTwo: "When should the money be ready?",
    questionThree: "What is your wedding budget?",
  },
  OWN_HOME: {
    title: "Plan Name",
    questionOne: "Give this plan a name",
    questionTwo: "When should the money be ready?",
    questionThree: "How much do you need?",
  },
  RENT: {
    title: "Plan Name",
    questionOne: "Give this plan a name",
    questionTwo: "When should the money be ready?",
    questionThree: "How much do you need?",
  },
};

export const GoalFormContext = React.createContext();
const initialState = {
  isOpen: false,
  fromType: goalFormTypes.FIXED_INCOME,
  goalFormQuestions: {},
};

export const goalFormActions = {
  OPEN_FORM: "OPEN_FORM",
  CLOSE_FORM: "CLOSE_FORM",
};

const reducer = (goalFormState, action) => {
  switch (action.type) {
    case goalFormActions.OPEN_FORM:
      return (goalFormState = { ...goalFormState, isOpen: true });
    case goalFormActions.CLOSE_FORM:
      return (goalFormState = { ...goalFormState, isOpen: false });
    case goalModalProps.fixedIncome.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.FIXED_INCOME,
      });
    case goalModalProps.ownYourHome.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.OWN_HOME,
      });
    case goalModalProps.planWedding.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.WEDDING,
      });
    case goalModalProps.saveForRent.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.RENT,
      });
    case goalModalProps.saveForSchool.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.SCHOOL,
      });
    case goalModalProps.startBusiness.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.START_BUSINESS,
      });
    case goalModalProps.travel.title:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.TRAVEL,
      });
    default:
      return (goalFormState = {
        ...goalFormState,
        goalFormQuestions: goalFormQuestions.FIXED_INCOME,
      });
      break;
  }
};

const GoalFormProvider = ({ children }) => {
  const [goalFormState, dispatch] = useReducer(reducer, initialState);
  return (
    <GoalFormContext.Provider value={{ goalFormState, dispatch }}>
      {children}
    </GoalFormContext.Provider>
  );
};

export default GoalFormProvider;