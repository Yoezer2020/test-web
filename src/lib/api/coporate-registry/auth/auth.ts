import axios from "axios";

const serviceBaseUrl = `${process.env.NEXT_PUBLIC_COPORATE_REGISTRY_API_ENDPOINT}`;
const servicePrefix = `${serviceBaseUrl}/api/coporate-registry/auth`;

const LoginUser = async (formData: any) => {
  const response = await axios.post(`${servicePrefix}/login`, formData);
  return response.data;
};

const AuthService = {
  LoginUser,
};

export default AuthService;
