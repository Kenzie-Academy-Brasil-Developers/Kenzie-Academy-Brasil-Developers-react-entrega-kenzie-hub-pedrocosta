
import { ReactNode } from "react";
import { TechProvider } from "../TechContext";
import { UserProvider } from "../UserContext";


interface iprovidersPropps {
children:ReactNode
}

const Providers = ({ children }:iprovidersPropps) => {
  return <UserProvider>
    <TechProvider>
    {children}
    </TechProvider>
    
    </UserProvider>;
};
export default Providers;
