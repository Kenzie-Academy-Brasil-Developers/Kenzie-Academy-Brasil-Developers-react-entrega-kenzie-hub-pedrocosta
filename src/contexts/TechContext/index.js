import { createContext, useEffect, useState } from "react";
import api from "../../services/api";

export const TechContext = createContext({});

 export  const TechProvider = ({ children }) => {
  const [techModal, setTechModal] = useState(false);
  const [technology, setTechnology] = useState([]);
  //   const [technologyId,setTechnologyId] = useState();

  const createTech = (data) => {
    api
      .post("/users/techs", data)
      .then((response) => {
        setTechModal(false);
        setTechnology([...technology, response.data]);
      })
      .catch((err) => console.log(err));
  };

  const getTech = () => {
    api
      .get("/profile")
      .then((response) => setTechnology([...response.data.techs]))

      .catch((err) => err);
  };

   const deleteTech = (data) => {
   api
      .delete(`/users/techs/${data.id}`)
      .then((response) => {
        
       const filteredTechnology =  technology.filter(element => element !== data)
          setTechnology([...filteredTechnology])
       
        
        
        
      })
      .catch((err) => console.log(err));
      
      
  };

  return (
    <TechContext.Provider
      value={{
        techModal,
        setTechModal,
        createTech,
        technology,
        getTech,
        deleteTech,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
