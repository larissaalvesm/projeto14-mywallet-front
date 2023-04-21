import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function fazerLogin(e) {
    e.preventDefault();

    const obj = {
      email,
      senha
    }

    const request = api.post("/", obj);

    request.then(response => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      navigate("/home");
    });

    request.catch(err => {
      alert(err.response.data)
    });
  }
  return (
    <SingInContainer>
      <form onSubmit={fazerLogin}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input data-test="password" placeholder="Senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro" >
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
