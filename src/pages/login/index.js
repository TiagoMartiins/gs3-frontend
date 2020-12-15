import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
          <div>
          {this.state.error && <p>{this.state.error}</p>}
          </div>
          <input
            type="text"
            placeholder="Usuário"
            onChange={e => this.setState({ usuario: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ senha: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);