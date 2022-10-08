import { useNavigate } from "react-router-dom";
import { Container, Header, Sec, Title } from "./styles";

const DashBoard = ({ user }) => {
  const navigate = useNavigate();
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
