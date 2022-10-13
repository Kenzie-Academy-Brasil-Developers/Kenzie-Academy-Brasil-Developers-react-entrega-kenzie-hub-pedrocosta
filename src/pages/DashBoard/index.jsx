
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Container, Header, Sec, Title } from "./styles";

const DashBoard = () => {
  const {user,navigate} = useContext(UserContext)
  return (
    <>
      <Header>
        <Title>Kenzie Hub</Title>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </Header>

      <Sec>
        <Container>
          <h2>Ola, {user.name}</h2>
          <p>{user.course_module}</p>
        </Container>
      </Sec>
    </>
  );
};

export default DashBoard;
