import authOptions from "@/app/api/auth/[...nextauth]/utils/authOptions";
import moment from "moment";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";
export const getProtocolFormPayload = (payload: any) => {
  const members: string[] = [];
  if (payload?.members?.length > 0) {
    payload?.members.map((member: any) => {
      members.push(member?._id);
    });
  }
  return {
    ...payload,
    endDate: moment(new Date(payload?.endDate)).format("DD-MM-YYYY"),
    startDate: moment(new Date(payload?.startDate)).format("DD-MM-YYYY"),
    members,
  };
};

export const getUpdateProtocolFormPayload = (payload: any) => {
  const patientIds: string[] = [];
  if (payload?.members?.length > 0) {
    payload?.members.map((member: any) => {
      patientIds.push(member?._id);
    });
  }
  delete payload["members"];
  return {
    ...payload,
    endDate: moment(new Date(payload?.endDate)).format("DD-MM-YYYY"),
    startDate: moment(new Date(payload?.startDate)).format("DD-MM-YYYY"),
    patientIds,
  };
};

export const getAssessmentFormPayload = (protocolId: string, payload: any) => {
  const members: string[] = [];
  if (payload?.members?.length > 0) {
    payload?.members.map((member: any) => {
      members.push(member?._id);
    });
  }
  return {
    ...payload,
    protocolId,
    endDate: moment(new Date(payload?.endDate)).format("DD-MM-YYYY"),
    startDate: moment(new Date(payload?.startDate)).format("DD-MM-YYYY"),
    members,
  };
};

export const getAssessmentUpdareFormPayload = (payload: any) => {
  const patientIds: string[] = [];
  if (payload?.members?.length > 0) {
    payload?.members.map((member: any) => {
      patientIds.push(member?._id);
    });
  }
  return {
    ...payload,
    endDate: moment(new Date(payload?.endDate)).format("DD-MM-YYYY"),
    startDate: moment(new Date(payload?.startDate)).format("DD-MM-YYYY"),
    patientIds,
  };
};

export const getNextAuthProps = async (props: any) => {
  const { callbackUrl } = props?.searchParams;
  const session = await getServerSession(authOptions);
  const isAuthenticated = session ? true : false;
  const csrfToken = await getCsrfToken();
  const data: any = await getProviders();
  const providers = Object.values(data);
  return {
    providers,
    csrfToken,
    callbackUrl,
    isAuthenticated,
  };
};
