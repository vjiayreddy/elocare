import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "./routers";
import _ from "lodash";
import { API_URL } from "@/utils/constants";

export interface CreateFolterPayload {
  title: string;
  doctorId: string;
}

type projectDataType = {
  _id?: string;
  title?: string;
  label?: string;
  doctorData?: {
    _id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
  };
  bannerImage?: string;
  description?: string;
  createdDate?: {
    mongoTimestamp?: string;
  };
  isAsNeededAssessment?: boolean;
};

interface StudiesAndProjectFoldersResponseType {
  projectData: projectDataType[];
  studyData: projectDataType[];
}

export const studiesApi = createApi({
  reducerPath: "studiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
  tagTypes: ["fetchFoldersAndStudies"],
  endpoints: (builder) => ({
    createFolder: builder.mutation<any, CreateFolterPayload>({
      invalidatesTags: ["fetchFoldersAndStudies"],
      query: (body: any) => {
        return {
          url: API_ROUTES.CREATE_FOLDER,
          method: "POST",
          body: body,
        };
      },
    }),
    updateFolder: builder.mutation<any, { folderId: string; title: string }>({
      invalidatesTags: ["fetchFoldersAndStudies"],
      query: ({ title, folderId }) => {
        return {
          url: `${API_ROUTES.UPDATE_FOLDER}/${folderId}`,
          method: "POST",
          body: {
            title,
          },
        };
      },
    }),
    deleteFolder: builder.mutation<any, { folderId: string }>({
      invalidatesTags: ["fetchFoldersAndStudies"],
      query: ({ folderId }) => {
        return {
          url: `${API_ROUTES.DELETE_FOLDER}/${folderId}`,
          method: "DELETE",
        };
      },
    }),
    createStudy: builder.mutation<
      any,
      {
        title: string;
        isDoctorLocked: boolean;
        doctorId: string;
        projectId?: string;
        assessmentTemplateId: string;
        description: string;
        isEditable?: string
      }
    >({
      invalidatesTags: ["fetchFoldersAndStudies"],
      query: (body) => {
        return {
          url: API_ROUTES.CREATE_STUDY,
          method: "POST",
          body: body,
        };
      },
    }),
    updateStudy: builder.mutation<
      any,
      { studyId: string; patientIds?: string[]; title?: string }
    >({
      query: ({ studyId, patientIds, title }) => {
        return {
          url: `${API_ROUTES.UPDATE_STUDY}/${studyId}`,
          method: "POST",
          body: {
            title,
            patientIds,
          },
          invalidatesTags: ["fetchFoldersAndStudies"],
        };
      },
    }),
    deleteStudy: builder.mutation<any, { studyId: string }>({
      query: ({ studyId }) => {
        return {
          url: `${API_ROUTES.DELETE_STUDY}/${studyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["fetchFoldersAndStudies"],
    }),
    updateStudyBulkQuestions: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: API_ROUTES.UPDATE_STUDY_BLUK_QUESTIONS,
          method: "PATCH",
          body: body,
        };
      },
    }),

    fetchFoldersAndStudies: builder.query<
      { data: StudiesAndProjectFoldersResponseType },
      any
    >({
      providesTags: ["fetchFoldersAndStudies"],
      query: () => {
        return {
          url: API_ROUTES.FETCH_FOLDERS_STUDIES,
          method: "GET",
          params: {
            sortOrder: JSON.stringify(["alphabetical"]),
          },
        };
      },
    }),

    fetchStudiesByFolderId: builder.query<any, { projectId: string }>({
      query: ({ projectId }) => {
        return {
          url: API_ROUTES.FETCH_STUDIES_FOLDER_ID,
          params: {
            projectId,
          },
        };
      },
    }),

    filterPatients: builder.query<any, { dateOfBirth?: string }>({
      query: ({ dateOfBirth }) => {
        return {
          url: API_ROUTES.FILTER_PATIENTS,
          params: {
            dateOfBirth,
          },
        };
      },
      transformResponse: (response: any) => {
        if (response?.data?.length > 0) {
          let users: any[] = [];
          response?.data.map((user: any) => {
            users.push({
              id: user?._id,
              ...user,
            });
          });

          const patients = _.filter(users, (item: any) =>
            _.hasIn(item, "firstName")
          );
          return {
            data: _.uniqBy(patients, "firstName") as any[],
          };
        }
        return {
          data: [],
        };
      },
    }),
    fetchAllTemplates: builder.query<any, any>({
      query: (params) => {
        return {
          url: API_ROUTES.FETCH_TEMPLATES,
          method: "GET",
          params: {
            ...params,
          },
        };
      },
    }),
    fetchSingleTemplateQuestions: builder.query<any, { studyId: string }>({
      query: ({ studyId }) =>
        `${API_ROUTES.FETCH_SINGLE_ASSESSMENT_QUESTIONS}?studyId=${studyId}`,
      transformResponse: (response: any) => {
        let questions: any[] = [];
        if (response?.data) {
          questions = response?.data;
        }
        return questions;
      },
    }),
    fetchConditionalBasedAssessmentTemplates: builder.query<
      any,
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `${API_ROUTES.FETCH_CONDITIONAL_BASED_CATEGORY_TEMPLATES}/${id}`,
        };
      },
      transformResponse: (response: any) => {
        let templates: any[] = [];
        if (response?.data?.assessmentTemplates?.length > 0) {
          templates = response?.data?.assessmentTemplates;
        }
        return templates;
      },
    }),
  }),
});

export const {
  useUpdateStudyBulkQuestionsMutation,
  useUpdateStudyMutation,
  useCreateStudyMutation,
  useDeleteFolderMutation,
  useCreateFolderMutation,
  useFilterPatientsQuery,
  useFetchFoldersAndStudiesQuery,
  useLazyFetchFoldersAndStudiesQuery,
  useLazyFilterPatientsQuery,
  useFetchAllTemplatesQuery,
  useLazyFetchAllTemplatesQuery,
  useUpdateFolderMutation,
  useLazyFetchConditionalBasedAssessmentTemplatesQuery,
  useLazyFetchSingleTemplateQuestionsQuery,
  useFetchStudiesByFolderIdQuery,
  useDeleteStudyMutation,
  usePrefetch,
} = studiesApi;
