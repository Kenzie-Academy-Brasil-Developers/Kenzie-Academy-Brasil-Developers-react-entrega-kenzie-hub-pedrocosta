import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  ButtonLogin,
  ButtonNegative,
  Form,
  GoRegister,
  Sec,
  Title,
} from "./style";

const LoginPage = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);

  const navigate = useNavigate();
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

  const onSubmit = (data) => {
    api
      .post("/sessions", data)
      .then((resp) => {
        toast("Login feito com Sucesso", {
          autoClose: 1000,
          type: "success",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        setLoading(true);

        setUser(resp.data.user);
        localStorage.setItem("Token", resp.data.token);
      })
      .catch((err) => {
        const Warning = toast("Senha ou email incorretos", {
          autoClose: 1000,
          type: "error",
        });

        if (Warning) {
          setNotification(true);
        }

        setTimeout(() => {
          setNotification(false);
        }, 2000);
      });
  };
  console.log(notification);

  return (
    <Sec>
      <Title>Kenzie Hub</Title>
      {!loading ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>

          <label htmlFor="">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Digite aqui seu email"
          />
          <p>{errors.email?.message}</p>
          <label htmlFor="">Senha</label>
          <input
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
