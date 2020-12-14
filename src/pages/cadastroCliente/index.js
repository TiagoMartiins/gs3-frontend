import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"
import { login} from '../../services/auth';

import Logo from "../../logo-gs3.png";

import { Form, Container } from "./styles";

class SignUp extends Component {

  state = {
    nome:"",
    cpf:"",
    emails: [],
    error: "",
    enderecos:{
      cep: "",
      logradouro:"",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
    telefones: [ { tipoTelefone: "", ddd: ""}],
  };

  redirect = {
    saved: false
  }

  addDDD = e => {
    e.preventDefault();
    this.state.emails.push(e.target.value);
  }

  addTipoTelefone = e => {
    e.preventDefault();
    this.state.emails.push(e.target.value);
  }

  addEmail = e => {
    e.preventDefault();
    this.state.emails.push(e.target.value);
  }

  addTelefone = e => {
    e.preventDefault();
    if(this.state.tipoTelefone === 'undefined'){
      alert("Voce precisa definir um tipo de telefone");
    }else{
    console.log(this.state.tipoTelefone);
    this.state.telefones.push(e.target.value);
    console.log(this.state.telefones);
    }
  }

  findCep = async e => {
    e.preventDefault();
    const {cep} = this.state.enderecos;
    if(cep.length > 7) {
    try{
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    let statusCopy = Object.assign({},this.state);
    statusCopy.enderecos['cep'] = response.data.cep;
    statusCopy.enderecos['uf'] = response.data.uf;
    statusCopy.enderecos['bairro'] = response.data.bairro;
    statusCopy.enderecos['localidade'] = response.data.localidade;
    statusCopy.enderecos['logradouro'] = response.data.logradouro;
    statusCopy.enderecos['complemento'] = response.data.complemento;
    this.setState(statusCopy);
    }catch(error) {
      alert(error.message);
    }
  }
  }

  handleChange = (el) => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let statusCopy = null;

    if(inputName === 'logradouro' || inputName === 'bairro' || inputName === 'uf' || inputName === 'complemento' || inputName === 'localidade' || inputName === 'cep'){
      statusCopy = Object.assign({}, this.state);
      statusCopy.enderecos[inputName] = inputValue;
    }else{
    statusCopy = Object.assign({}, this.state);
    statusCopy[inputName] = inputValue;
    }

    this.setState(statusCopy);
  }

  handleSignUp = async e => {
    e.preventDefault();

      const response = await api.post("/cliente",JSON.stringify(this.state),{headers: {'Content-Type': 'application/json;charset=utf-8'}});
      if(response.data)
        this.props.history.push("/listaCliente");
        console.log(response);
      
    }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome"
            maxLength="100"
            minLength="3"
            name="nome"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={this.state.enderecos.cep}
            onBlur={this.findCep}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Logradouro"
            name="logradouro"
            value={this.state.enderecos.logradouro}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            value={this.state.enderecos.bairro}
            placeholder="Bairro"
            name="bairro"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            name="localidade"
            value={this.state.enderecos.localidade}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="UF"
            name="uf"
            value={this.state.enderecos.uf}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            name="complemento"
            value={this.state.enderecos.complemento}
            onChange={this.handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={e => this.addEmail(e)}
          />
          <label>Escolha o Tipo De Telefone</label>
          <select id="tipo" name="tipoTelefone" onChange={e => this.addTipoTelefone}>
          <option value="1">Residencial</option>
          <option value="2">Comercial</option>
          <option value="3">Celular</option>
          </select>
          <hr />
          <input
            type="text"
            placeholder="DDD"
            name="ddd"
            maxLength="2"
            onChange={e => this.addDDD(e)}
          />
          <input
            type="text"
            placeholder="Telefone"
            name="telefone"
            maxLength="9"
            onChange={e => this.addTelefone(e)}
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          {JSON.stringify(this.state)}
          <Link to="/">Fazer login</Link>
          <Link to={`lista`}>Lista Clientes</Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;