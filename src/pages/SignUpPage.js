import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;
  const api = axios.create({
    baseURL: baseURL
  })

  function cadastrar(e) {
    e.preventDefault();

    if (senha !== confSenha) {
      alert("Senhas diferentes.");
    } else {
      const obj = {
        email,
        nome,
        senha
      }
      const request = api.post("/cadastro", obj);

      request.then(() => navigate("/"));

      request.catch(err => {
        alert(err.response.data);
      });
    }

  }
  return (
    <SingUpContainer>
      <form onSubmit={cadastrar}>
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" required value={nome} onChange={e => setNome(e.target.value)} />
        <input data-test="email" placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input data-test="password" placeholder="Senha" type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autocomplete="new-password" required value={confSenha} onChange={e => setConfSenha(e.target.value)} />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
