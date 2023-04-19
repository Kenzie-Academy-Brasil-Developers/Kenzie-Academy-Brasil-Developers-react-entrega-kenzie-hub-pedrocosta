import { createContext, ReactNode, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export const UserContext = createContext({} as iUserProviderData);

interface iWorks {
  id: string;
  title: string;
  description: string;
  deploy_url: string;
  created_at: string;
  updated_at: string;
}

interface iTech {
  created_at: string;
  id: string;
  status: string;
  title: string;
  updated_at: string;
}

interface iUser {
  bio: string;
  contact: string;
  course_module: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  techs: iTech;
}

interface iProviderProps {
  children: ReactNode;
}

interface iRegisterData {
  email: string;
  password: string;
  name: string;
  bio: string;
  contact: string;
  course_module: string;
}

export interface iRegisterResponse {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
  techs?: iTech[] | [];
  works?: iWorks[] | [];
}

interface iOnSubmit {
  email: string;
  password: string;
}

interface iOnSubmitResponse {
  user: iRegisterResponse;
  token: string;
}

interface iUserProviderData {
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notification: boolean;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  notice: boolean;
  setNotice: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  registerUser: (data: iRegisterData) => void;
  onSubmit: (data: iOnSubmit) => void;
  authenticatedUser: boolean;
  setauthenticatedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserProvider = ({ children }: iProviderProps) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [authenticatedUser, setauthenticatedUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notice, setNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      navigate("/login");
    } else {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setauthenticatedUser(true);
      api
        .get("/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    }
  }, []);

  useEffect(() => {
    if (authenticatedUser === true) {
      navigate("/dashboard");
    }
  }, [authenticatedUser]);

  const registerUser = (data: iRegisterData) => {
    api
      .post<iRegisterResponse>("/users", data)

      .then((resp) => {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        toast("Cadastro  feito com Sucesso", {
          autoClose: 1000,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
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

  const onSubmit = (data: iOnSubmit) => {
    api
      .post<iOnSubmitResponse>("/sessions", data)
      .then((resp) => {
        setLoading(true);
        toast("Login feito com Sucesso", {
          autoClose: 1000,
          type: "success",
        });
        localStorage.setItem("Token", resp.data.token);
        const token = localStorage.getItem("Token");
        api.defaults.headers.Authorization = `Bearer ${token}`;

        if (token) {
          api
            .get("/profile")
            .then((response) => {
              setauthenticatedUser(true);
              setUser(response.data);
              navigate("/dashboard");
            })
            .catch((err) => {
              console.log(err);
              navigate("/login");
            });
        }

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
        authenticatedUser,
        setauthenticatedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
