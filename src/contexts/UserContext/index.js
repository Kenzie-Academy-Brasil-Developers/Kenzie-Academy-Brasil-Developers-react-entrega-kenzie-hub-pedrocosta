import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notice, setNotice] = useState(false);
  const navigate = useNavigate();


  // useEffect(() => {
  //   async function loadUser() {

  //     const token = localStorage.getItem("Token")
  //     if(token) {
  //         try {
  //           api.defaults.headers.authorization = `Bearer ${token}`;
  //             const getUserinfo = await api.get("/profile")
  //             setUser(getUserinfo)
              
  //             // setLoading(true)
            
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     } 

  //   }
  //  loadUser()
  //  console.log(user)
  //   }, [])




  const getUser = () => {
    api
      .get("/profile")
      .then((response) =>
        setUser(response.data))
      .catch((err) => console.log(err))
  };

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
        const token = localStorage.getItem("Token");
        api.defaults.headers.authorization = `Bearer ${token}`;
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
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        notification,
        setNotification,
        notice,
        setNotice,
        navigate,
        registerUser,
        onSubmit,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
