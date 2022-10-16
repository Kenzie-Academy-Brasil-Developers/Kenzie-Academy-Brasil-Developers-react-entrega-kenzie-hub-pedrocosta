import { useForm } from "react-hook-form";
import {
  ButtonNegative,
  ButtonRegister,
  Container,
  Form,
  GoLogin,
  Sec,
  Title,
} from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const RegisterPage = () => {
  const { registerUser, notice, navigate } = useContext(UserContext);

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("Email obrigatório").email(),
    password: yup
      .string()
      .required(
        "Senha obrigatória, a senha devera conter:  no minimo 8 caracteres, carcteres especiais ex: @, numeros, letras maiuculas e letras minusculas "
      )
      .min(8, "A senha deve ter no minimo 8 caracteres")
      .matches(/[A-Z]/, "Deve conter letras maiuculas")
      .matches(/[a-z]/, "Deve conter letras minusculas")
      .matches(/(\W)|_/, "Deve conter carcteres especiais ex: @")
      .matches(/(\d)|_/, "Deve conter numeros"),
    passwordConfirmation: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "Passwords must match"),
    bio: yup.string().required("Bio abrigatória"),
    contact: yup.string().required("Telefone obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  return (
    <Sec>
      <Container>
        <Title>Kenzie Hub</Title>
        {!notice ? (
          <GoLogin onClick={() => navigate("/login")}>Login</GoLogin>
        ) : (
          <GoLogin>Login</GoLogin>
        )}
      </Container>

      <Form onSubmit={handleSubmit(registerUser)}>
        <div>
          <h3>Crie sua conta</h3>
        </div>

        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Digite aqui seu nome"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite aqui seu email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <label htmlFor="passwordConfirmation">Confirmar Senha</label>
        <input
          id="passwordConfirmation"
          type="password"
          placeholder="Digite novamente sua senha"
          {...register("passwordConfirmation")}
        />
        <p>{errors.passwordConfirmation?.message}</p>
        <label htmlFor="bio">Bio</label>
        <input
          id="bio"
          type="text"
          placeholder="Fale sobre você"
          {...register("bio")}
        />
        <p>{errors.bio?.message}</p>
        <label htmlFor="contact">Telefone</label>
        <input
          id="contact"
          type="text"
          placeholder="Opção de contato"
          {...register("contact")}
        />

        <p>{errors.contact?.message}</p>
        <label htmlFor="course_module">Seu Módulo:</label>
        <select name="" id="course_module" {...register("course_module")}>
          <option value="Modulo 1">Módulo 1</option>
          <option value="Modulo 2">Módulo 2</option>
          <option value="Modulo 3">Módulo 3</option>
          <option value="Modulo 4">Módulo 4</option>
          <option value="Modulo 5">Módulo 5</option>
          <option value="Modulo 6">Módulo 6</option>
        </select>

        {!notice ? (
          <ButtonRegister type="submit">Cadastrar</ButtonRegister>
        ) : (
          <ButtonNegative type="button">Cadastrar</ButtonNegative>
        )}
      </Form>
    </Sec>
  );
};

export default RegisterPage;
