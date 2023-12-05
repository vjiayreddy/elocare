export const APP_BAR_SIZE = 75;
export const APP_ROUTES = {
  HOME: "/",
  STUDIES: "/studies",
  INSIGHTS: "/insights",
};
export const CREATE_NEW_PROJECT_FOLDER = "Create new binder";
export const CREATE_NEW_STUDY = "Create new assessment";
export const PARKINSON_DISEASE = "6560b2d431d4dca16bbb264e";

export const mainMenus = [
  {
    url: APP_ROUTES.HOME,
    label: "Home",
  },
  {
    url: APP_ROUTES.STUDIES,
    label: "Studies",
  },
  {
    url: APP_ROUTES.HOME,
    label: "Insights",
  },
];

export const FOLDER = [
  {
    title: "Stroke",
    status: "0 Studies",
    iconType: "FOLDER",
  },
  {
    title: "Foundation for Voice Analysis: Collect Your Baseline",
    status: "0 responses",
    iconType: "STUDY",
  },
  {
    title: "Multiple Sclerosis",
    status: "0 Studies",
    iconType: "FOLDER",
  },
  {
    title: "Parkinson’s Disease",
    status: "1 Studies",
    iconType: "FOLDER",
  },
  {
    title: "Traumatic Brain Injury",
    status: "0 Studies",
    iconType: "FOLDER",
  },
];

export const QUESTION_TYPES_OPTIONS = [
  {
    value: "INTRODUCTION",
    label: "Introduction",
  },
  {
    value: "TEXT",
    label: "Open Text",
  },
  {
    value: "AUDIO",
    label: "Voice",
  },
  {
    value: "VIDEO",
    label: "Video",
  },
  {
    value: "EMOJI_RATING",
    label: "Emotional Well Being",
  },
  {
    value: "SINGLE_SELECTION",
    label: "Single Select",
  },
  {
    value: "MULTI_SELECTION",
    label: "Mutli Select",
  },
  {
    value: "RATING",
    label: "Rating Scale",
  },
];

export const QUESTION_TYPES = {
  INTRODUCTION: "INTRODUCTION",
  TEXT: "TEXT",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  EMOJI_RATING: "EMOJI_RATING",
  SINGLE_SELECTION: "SINGLE_SELECTION",
  MULTI_SELECTION: "MULTI_SELECTION",
  RATING: "RATING",
};

export const defaultQuestionValues = {
  title: "",
  value: "",
  _id: "",
  questionType: "",
  options: [],
  responseType: [],
  studyId: "",
  demoVideoUrl: "",
  inputField: null,
  isRequired: true,
  subQuestion: [],
  stage: 1,
};

export const AUTH_STATUS = {
  AUTHENTICATED: "authenticated",
  LOADING: "loading",
  UNAUTHENTICATED: "unauthenticated",
};

export const API_URL = "https://sa-ransolutions.hotrasoft.com:8000";
export const NEXT_PUBLIC_AUTH_SECRET =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDY3NTU1NywiaWF0IjoxNjk0Njc1NTU3fQ.uGCn3B_HFu_FPdfYB-ikGoBlrwAx5YjVfzqjN6olxHA";

export const AUTH_API_STATUS = {
  PASSWORD_NOT_MATCHED: "Password does not match",
  USER_REGISTRAION_SUCCESSFULL: "User registered successfully",
  PROTOCOL_REGISTRED_SUCCESSFULL: "Protocol created successfully",
  PROTOCOL_UPDATED_SUCCESSFULL: "Protocol Updated successfully",
  ASSESSMENT_CREATED_SUCCESSFULL: "Assessment created successfully",
  ASSESSMENT_UPDATED_SUCCESSFULL: "Assessment created successfully",
  ASSESSMENT_QUESTION_CREATED_SUCCESSFULL:
    "Created Assessment question successfully",
};
