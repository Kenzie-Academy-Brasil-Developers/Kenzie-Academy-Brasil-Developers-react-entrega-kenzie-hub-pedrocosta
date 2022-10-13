
import {UserProvider} from "../userContext"

const Providers = ({children}) => {

return (
    <UserProvider>
        {children}
    </UserProvider>
)


}
export default Providers