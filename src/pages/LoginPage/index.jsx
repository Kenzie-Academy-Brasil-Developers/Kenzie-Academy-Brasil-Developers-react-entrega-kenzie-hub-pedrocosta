import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ButtonLogin,
  ButtonNegative,
  Form,
  GoRegister,
  Sec,
  Title,
} from "./style";
import { useContext} from "react";
import { UserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const { loading, notification, onSubmit, navigate } = useContext(UserContext);





  const formSchema = yup.object().shape({
    email: yup.string().required("Nome obrigatorio").email(),
    password: yup.string().required("Senha obrigatória"),
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
      <Title>
        Kenzie Hub
      </Title>
      {!loading ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Digite aqui seu email"
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

          {!notification ? (
            <ButtonLogin type="submit">Entrar</ButtonLogin>
          ) : (
            <ButtonNegative type="button">Entrar</ButtonNegative>
          )}
          <div>
            <p>Ainda não possui uma conta?</p>
            {!notification ? (
              <GoRegister onClick={() => navigate("/register")} type="button">
                Cadastre-se
              </GoRegister>
            ) : (
              <GoRegister type="button">Cadastre-se</GoRegister>
            )}
          </div>
        </Form>
      ) : (
        <div>
          <h2>carregando...</h2>
        </div>
      )}
    </Sec>
  );
};

export default LoginPage;
