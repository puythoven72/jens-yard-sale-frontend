import { Outlet, Navigate } from "react-router-dom";
import AuthServices from "../components/services/AuthServices";
function PrivateRoutes(children, ...rest) {


    return (
        AuthServices.getAuthToken() ? <Outlet /> : <Navigate to={"/user/login"} />
)


}

export default PrivateRoutes;