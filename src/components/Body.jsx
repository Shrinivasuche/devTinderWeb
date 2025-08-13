import Footer from './Footer'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from "../utils/userSlice"
import { useEffect } from 'react'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    // log statements
    console.log("fetchUser called");
    console.log("BASE_URL in prod:", BASE_URL);
    console.log("userData at fetch start:", userData);


    if(userData && Object.keys(userData).length > 0) return;
    try{
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // prints the user
      console.log("Dispatching user:", res.data);
      dispatch(addUser(res.data));

    } catch(error){
      if(error.response?.status === 401){
        navigate("/login")
      }
      console.error(error);
    }
  }

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      fetchUser();
    }
  }, []);


  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body