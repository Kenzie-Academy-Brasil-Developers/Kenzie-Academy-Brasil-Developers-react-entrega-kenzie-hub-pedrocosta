import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";

export const TechContext = createContext({} as iTechProviderData);

interface iTecnology {
  title: string;
  status: string;
}

interface iTechProps {
  children: ReactNode;
}

interface iTech {
  title: string;
  status: string;
}

interface iTechProviderData {
  techModal: boolean;
  setTechModal:  React.Dispatch<React.SetStateAction<boolean>>;
  createTech: (data: iTecnology) => void;
  technology: iTecnologyData[];
  deleteTech: (data: iTecnologyData) => void;
  setTechnology: React.Dispatch<React.SetStateAction<iTecnologyData[]>>;
  loading: boolean;
}

interface iTecnologyData {
  id: String;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const TechProvider = ({ children }: iTechProps) => {
  const [techModal, setTechModal] = useState(false);
  const [technology, setTechnology] = useState([] as iTecnologyData[]);
  const [loading, setLoading] = useState(false);
  const createTech = (data: iTecnology) => {
    
    api
      .post<iTecnologyData>("/users/techs",data)
      .then((response) => {
        setLoading(true);
        setTechModal(false);
        setTechnology([...technology, response.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast("falha ao criar tecnologia", {
          autoClose: 1000,
        });
        console.log(err)});
  };

  const deleteTech = (data: iTecnologyData) => {
    api

      .delete(`/users/techs/:${data.id}`)
      .then((response) => {
        setLoading(true);
        const filteredTechnology = technology.filter(
          (element) => element !== data
        );
        setTechnology([...filteredTechnology]);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast("falha ao apagar tecnologia", {
          autoClose: 1000,
        });
      });
  };

  return (
    <TechContext.Provider
      value={{
        techModal,
        setTechModal,
        createTech,
        technology,
        deleteTech,
        setTechnology,
        loading,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
