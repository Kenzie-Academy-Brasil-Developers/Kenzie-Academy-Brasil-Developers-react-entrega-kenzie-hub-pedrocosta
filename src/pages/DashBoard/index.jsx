import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TechContext } from "../../contexts/TechContext";
import { UserContext } from "../../contexts/UserContext";
import {
  Container,
  Form,
  Header,
  ModalBackGround,
  Sec,
  TechContainer,
  TechSection,
  Title,
} from "./styles";
import trashCan from "../../assets/Vector.png";

const DashBoard = () => {
  const formSchema = yup.object().shape({
    title: yup.string().required("Nome obrigatorio"),
  });
  const { user, navigate } = useContext(UserContext);
  const {
    techModal,
    setTechModal,
    createTech,
    getTech,
    technology,
    deleteTech,
  } = useContext(TechContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    getTech();
  }, []);

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
        <Container>
          <h3>Tecnologias</h3>
          {!techModal ? (
            <button onClick={() => setTechModal(true)}>+</button>
          ) : (
            <button onClick={() => setTechModal(false)}>-</button>
          )}
        </Container>
        <TechSection>
          {technology.map((element, index) => (
            <TechContainer key={index}>
              <h4>{element.title}</h4>
              <div>
                <h4>{element.status}</h4>
                <button onClick={() => deleteTech(element)}>
                  {" "}
                  <img src={trashCan} />
                </button>
              </div>
            </TechContainer>
          ))}
        </TechSection>

        {techModal ? (
          <ModalBackGround>
            <Form onSubmit={handleSubmit(createTech)}>
              <div>
                <button onClick={() => setTechModal(false)}>X</button>
              </div>

              <label htmlFor="">Nome</label>
              <input
                type="text"
                placeholder="escreva o nome da TEC"
                {...register("title")}
              />
              <p>{errors.title?.message}</p>
              <label htmlFor="">Nivel de Conhecimento</label>
              <select name="" id="" {...register("status")}>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>

              <button type="submit">Confirmar</button>
            </Form>
          </ModalBackGround>
        ) : null}
      </Sec>
    </>
  );
};

export default DashBoard;
