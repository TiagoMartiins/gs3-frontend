import React, { Component } from "react";

import api from "../../services/api"

import {isAuthenticated} from "../../services/auth"

import  Input from '../../components/input';


import { Form, Container } from "./styles";

class SignUp extends Component {

  state = {
    nome:"",
    cpf:"",
    emails: [],
    error: "",
    endereco:{
      cep: "",
      logradouro:"",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
    },
    telefones: [ { 
      tipoTelefone: "", 
      ddd: "",
      numeroTelefone:""}
    ]
  };

  redirect = {
    saved: false
  }

  addEmail = e => {
    e.preventDefault();
    this.state.emails.push(e.target.value);
  }

  handleChangeTelefone1 = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;

    this.state.telefones[0][inputName] = inputValue;
  }

  componentDidMount(){
    if(!isAuthenticated()){
      document.getElementById('container').style.display= 'none';
      alert("Usuario não autenticado");
    }
  }

  findCep = async e => {
    e.preventDefault();
    const {cep} = this.state.endereco;
    if(cep.length > 7) {
    try{
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    let statusCopy = Object.assign({},this.state);
    statusCopy.endereco['cep'] = response.data.cep;
    statusCopy.endereco['uf'] = response.data.uf;
    statusCopy.endereco['bairro'] = response.data.bairro;
    statusCopy.endereco['localidade'] = response.data.localidade;
    statusCopy.endereco['logradouro'] = response.data.logradouro;
    statusCopy.endereco['complemento'] = response.data.complemento;
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
      statusCopy.endereco[inputName] = inputValue;
    }else{
    statusCopy = Object.assign({}, this.state);
    statusCopy[inputName] = inputValue;
    }

    this.setState(statusCopy);
  }

  handleSignUp = async e => {
    e.preventDefault();

    console.log("aPI");
    console.log(this.state);
    try{
      const response = await api.post("/cliente",JSON.stringify(this.state),{headers: {'Content-Type': 'application/json;charset=utf-8'}});
      if(response.data)
        this.props.history.push("/listaCliente");
        console.log(response);
    }catch(error){
      alert("Erro");
    }   
  }

  render() {
    return (
      <Container id="container">
        <Form onSubmit={this.handleSignUp}>
          {this.state.error && <p>{this.state.error}</p>}
          <h1>Cadastro De Cliente</h1>
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
            maxLength="11"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            maxLength="8"
            value={this.state.endereco.cep}
            onBlur={this.findCep}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Logradouro"
            name="logradouro"
            value={this.state.endereco.logradouro}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            value={this.state.endereco.bairro}
            placeholder="Bairro"
            name="bairro"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            name="localidade"
            value={this.state.endereco.localidade}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="UF"
            name="uf"
            value={this.state.endereco.uf}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            name="complemento"
            value={this.state.endereco.complemento}
            onChange={this.handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={e => this.addEmail(e)}
          />
          <label>Preencha no mínimo um telefone</label>
          <label>Escolha o Tipo De Telefone</label>
          <select id="tipo" name="tipoTelefone" onChange={this.handleChangeTelefone1} required>
          <option value="0"> Selecione </option>
          <option value="1">Residencial</option>
          <option value="2">Comercial</option>
          <option value="3">Celular</option>
          </select>
          <hr />
          <input
            type="text"
            placeholder="DDD"
            name="ddd"
            minLength="2"
            maxLength="2"
            onChange={this.handleChangeTelefone1}
            required
          />
          <input
            type="text"
            placeholder="Telefone"
            name="numeroTelefone"
            maxLength="9"
            onChange={this.handleChangeTelefone1}
            required
          />
          <button type="submit">Cadastrar Cliente</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default SignUp;