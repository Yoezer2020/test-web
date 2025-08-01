import axios from "axios";

const serviceBaseUrl = `${process.env.NEXT_PUBLIC_COPORATE_REGISTRY_API_ENDPOINT}`;
const servicePrefix = `${serviceBaseUrl}/api/coporate-registry/csp-details`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubmitCSPExpressionOfInterest = async (formData: any) => {
  try {
    const response = await axios.post(`${servicePrefix}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error Submitting CSP EOI :", err.message);
    throw err;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadCSPDetails = async (id: string, file: any) => {
  try {
    const response = await axios.patch(
      `${servicePrefix}/upload-files/${id}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error Uploading CSP documents :", err.message);
    throw err;
  }
};

// API to get all applications
const GetAllApplications = async () => {
  const response = await axios.get(
    `${servicePrefix}/route-permit-applications?`
  );

  return response.data.data;
};

// API to fetch route permit application details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetRoutePermitApplicationDetails = async (id: any) => {
  return axios
    .get(
      `${servicePrefix}/route-permit-applications/applicant-guests/${id}`,
      {}
    )
    .then((response) => response.data);
};

// API to submit form details
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeleteRoutePermitApplications = async (id: any) => {
  return axios
    .delete(`${servicePrefix}/route-permit-applications/${id}`)
    .then((response) => response.data);
};

// API to resubmit details after reapply
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReSubmitRoutePermitDetails = async (id: any, formData: any) => {
  const response = await axios.patch(
    `${servicePrefix}/route-permit-applications/resubmit/${id}`,
    formData
  );

  return response.data;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetRoutePermitsByAppNo = async (applicationNo: any) => {
  const response = await axios.get(
    `${servicePrefix}/route-permits/${applicationNo}/generate-route-permit`
  );

  return response;
};

const CSPExpressionOfInterestService = {
  SubmitCSPExpressionOfInterest,
  uploadCSPDetails,
  GetRoutePermitApplicationDetails,
  DeleteRoutePermitApplications,
  GetAllApplications,
  ReSubmitRoutePermitDetails,
  GetRoutePermitsByAppNo,
};

export default CSPExpressionOfInterestService;
