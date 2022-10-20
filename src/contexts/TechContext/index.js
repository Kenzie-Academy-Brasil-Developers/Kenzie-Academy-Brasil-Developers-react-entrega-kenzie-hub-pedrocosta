import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

export const TechContext = createContext({});

export const TechProvider = ({ children }) => {
  const [techModal, setTechModal] = useState(false);
  const [technology, setTechnology] = useState([]);
  const [loading, setLoading] = useState(false)
  const createTech = (data) => {
    api
      .post("/users/techs", data)
      .then((response) => {
        setLoading(true);
        setTechModal(false);
        setTechnology([...technology, response.data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteTech = (data) => {
    api
   
      .delete(`/users/techs/${data.id}`)
      .then((response) => {
        setLoading(true);
        const filteredTechnology = technology.filter(
          (element) => element !== data
        );
        setTechnology([...filteredTechnology]);
        
          setLoading(false);
         
      })
      .catch((err) => {
        
        console.log(err)
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
        loading
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
