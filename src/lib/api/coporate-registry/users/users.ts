import axios from "axios";

const serviceBaseUrl = `${process.env.NEXT_PUBLIC_COPORATE_REGISTRY_API_ENDPOINT}`;
const servicePrefix = `${serviceBaseUrl}/api/coporate-registry/users`;

const CheckUserEmail = async (formData: any) => {
  const response = await axios.post(`${servicePrefix}/check-email`, formData);
  return response.data;
};

const UsersService = {
  CheckUserEmail,
};

export default UsersService;
