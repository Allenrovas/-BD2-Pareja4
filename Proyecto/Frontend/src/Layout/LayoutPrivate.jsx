import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "../userCtx/User";

const LayoutPrivate = () => {
    const { logged } = useUser();
    return (
        <>
            {logged ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default LayoutPrivate;