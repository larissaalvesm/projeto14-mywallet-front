import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Context from "../contexts/Context";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setToken } = useContext(Context);
  const navigate = useNavigate();

  function fazerLogin(e) {
    e.preventDefault();

    const obj = {
      email,
      senha
    }

    const request = api.post("/", obj);

    request.then(response => {
      setToken(response.data);
      localStorage.setItem("token", response.data);
      navigate("/home");
    });

    request.catch(err => {
      alert(err.response.data)
    }
    );
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
