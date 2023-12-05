"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFolder: null,
  selectTemplateStudy: null,
  selectedTemplateQuestionData: null,
};

export const projectFolderAndstudySlice: any = createSlice({
  name: "projectFolderAndstudySlice",
  initialState,
  reducers: {
    setProjectFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setTemplateStudy: (state, action) => {
      state.selectTemplateStudy = action.payload;
    },
    setAssessmentTemplateQuestionData: (state, action) => {
      state.selectedTemplateQuestionData = action.payload;
    },
    resetProjectFolderState: (state, action) => {
      state.selectedFolder = action.payload;
    },
  },
});

export const { setProjectFolder, resetProjectFolderState, setTemplateStudy,setAssessmentTemplateQuestionData } =
  projectFolderAndstudySlice.actions;

export default projectFolderAndstudySlice.reducer;
