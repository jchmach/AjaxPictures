import { useNavigate, useLocation } from "react-router-dom";
import AdminMovieComp from "../components/AdminMovieComp";
function AdminMovie(){
    const params = useLocation();

    return(
        <div>
            <AdminMovieComp title={params.state.title} year={params.state.year}></AdminMovieComp>
        </div>
    )
}
export default AdminMovie;