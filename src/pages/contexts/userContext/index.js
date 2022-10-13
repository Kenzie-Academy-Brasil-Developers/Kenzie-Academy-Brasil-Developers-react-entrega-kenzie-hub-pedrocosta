import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";

export const UserContext =  createContext({})


export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notice, setNotice] = useState(false);
    const navigate = useNavigate();




    const registerUser = (data) => {
        api
          .post("/users", data)
    
          .then((resp) => {
            setTimeout(() => {
              navigate("/login");
            }, 1500);
            toast("Cadastro  feito com Sucesso", {
              autoClose: 1000,
            });
          })
          .catch((err) => {
            const Warning = toast("falha ao cadastrar", {
              autoClose: 1000,
            });
            if (Warning) {
              setNotice(true);
            }
    
            setTimeout(() => {
              setNotice(false);
            }, 1600);
          });
      };

    const onSubmit = (data) => {
        
        api
          .post("/sessions", data)
          .then((resp) => {
            setLoading(true);
            toast("Login feito com Sucesso", {
              autoClose: 1000,
              type: "success",
            });
    
            navigate("/dashboard");
           
    
            setUser(resp.data.user);
            localStorage.setItem("Token", resp.data.token);
            setLoading(false);
          })
          .catch((err) => {
        
            const Warning = toast("Senha ou email incorretos", {
              autoClose: 1000,
              type: "error",
            });
    
            if (Warning) {
              setNotification(true);
            }
    
            setTimeout(() => {
              setNotification(false);
            }, 2000);
          });
      };
  

return (

<UserContext.Provider value={{user,setUser,loading,setLoading,notification,setNotification,notice,setNotice,navigate, registerUser,onSubmit}}>
    {children}
</UserContext.Provider>


)


}

  