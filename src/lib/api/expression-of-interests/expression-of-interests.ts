import axios from "axios";

const serviceBaseUrl = `${process.env.NEXT_PUBLIC_COPORATE_REGISTRY_API_ENDPOINT}`;
const servicePrefix = `${serviceBaseUrl}/api/expression-of-interests`;

const SubmitExpressionOfInterest = async (formData: any) => {
  const response = await axios.post(`${servicePrefix}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// API to get all applications
const GetAllApplications = async () => {
  const response = await axios.get(
    `${servicePrefix}/route-permit-applications?`
  );

  return response.data.data;
};

// API to fetch route permit application details
const GetRoutePermitApplicationDetails = async (id: any) => {
  return axios
    .get(
      `${servicePrefix}/route-permit-applications/applicant-guests/${id}`,
      {}
    )
    .then((response) => response.data);
};

// API to submit form details

const DeleteRoutePermitApplications = async (id: any) => {
  return axios
    .delete(`${servicePrefix}/route-permit-applications/${id}`)
    .then((response) => response.data);
};

// API to resubmit details after reapply
const ReSubmitRoutePermitDetails = async (id: any, formData: any) => {
  const response = await axios.patch(
    `${servicePrefix}/route-permit-applications/resubmit/${id}`,
    formData
  );

  return response.data;
};

const GetRoutePermitsByAppNo = async (applicationNo: any) => {
  const response = await axios.get(
    `${servicePrefix}/route-permits/${applicationNo}/generate-route-permit`
  );

  return response;
};

const ExpressionOfInterestService = {
  SubmitExpressionOfInterest,
  GetRoutePermitApplicationDetails,
  DeleteRoutePermitApplications,
  GetAllApplications,
  ReSubmitRoutePermitDetails,
  GetRoutePermitsByAppNo,
};

export default ExpressionOfInterestService;
