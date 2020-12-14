import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../logo-gs3.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class Login extends Component {
  state = {
    usuario: "",
    senha: "",
    error: ""
  };

  handleSignIn = async e => {

    e.preventDefault();
    const { usuario, senha } = this.state;
    if (!usuario || !senha) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/login", { usuario, senha });
        console.log("TOKEN");
        console.log(response);
        login(response.headers.authorization);
        this.props.history.push("/signup");
      } catch (err) {
        this.setState({
          error:
            "Verifique suas credenciais"
        });
      }
    }
  };

  render() {

    const {error} = this.props.match.params;
    return (
      <Container>
        {error && <p>Sua sessão expirou</p>}
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="usuario"
            placeholder="Usuário"
            onChange={e => this.setState({ usuario: e.target.value })}
          />
          <input
            type="senha"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);