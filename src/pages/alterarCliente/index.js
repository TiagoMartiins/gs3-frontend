import React, { Component } from "react";
import api from "../../services/api"
import { Form, Container } from "./styles";

class Alterar extends Component {

  state = {
    cliente: {
        idCliente:"",
        nome:"",
        cpf:"",
        endereco: {
            cep:"",
            logradouro:"",
            bairro:"",
            localidade:"",
            uf:"",
            complemento:""
        },
        emails: [],
        telefones: []
    }
}

transformStringToInt= (tipoTelefone) => {
    switch(tipoTelefone){
        case 'RESIDENCIAL':
            return 1;
        case 'COMERCIAL':
            return 2;
        case 'CELULAR':
            return 3;
    }
}

  async componentDidMount() {
    const {id} = this.props.match.params;

    console.log("Entoru");

    await api.get(`/cliente/get?id=${id}`).then(response =>{
        let cliente = response.data;
        cliente.telefones.map(x =>{
            console.log(x.tipoTelefone);
            x.tipoTelefone = this.transformStringToInt(x.tipoTelefone);
            console.log(x.tipoTelefone);
            console.log("Entrou aq");
        })
        this.setState({cliente});
        console.log(response.data);
        console.log(this.state.cliente);
    }).catch(error =>{
        alert("Erro");
        document.getElementById('container').style.display="none";
    })
    
}

  addEmail = e => {
    e.preventDefault();
    this.state.cliente.emails[0] = e.target.value;
  }

  handleChangeTelefone1 = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;

    this.state.cliente.telefones[0][inputName] = inputValue;
  }

  findCep = async e => {
    e.preventDefault();
    const {cep} = this.state.endereco;
    if(cep.length > 7) {
    try{
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    let statusCopy = Object.assign({},this.state.cliente);
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
      statusCopy = Object.assign({}, this.state.cliente);
      statusCopy.endereco[inputName] = inputValue;
    }else{
    statusCopy = Object.assign({}, this.state.cliente);
    statusCopy[inputName] = inputValue;
    }

    this.setState(statusCopy);
  }

  handleAlterar = async e => {
    e.preventDefault();
    try{
      const response = await api.post("/cliente",JSON.stringify(this.state),{headers: {'Content-Type': 'application/json;charset=utf-8'}});
      if(response.data)
        this.props.history.push("/lista");
    }catch(error){
      alert("Erro");
    }   
  }

  render() {
    return (
      <Container id="container">
        <Form onSubmit={this.handleAlterar}>
          {this.state.error && <p>{this.state.error}</p>}
          <h1>Alterar</h1>
          <input
            type="text"
            placeholder="Nome"
            maxLength="100"
            minLength="3"
            value={this.state.cliente.nome}
            name="nome"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={this.state.cliente.cpf}
            maxLength="11"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            maxLength="8"
            value={this.state.cliente.endereco.cep}
            onBlur={this.findCep}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Logradouro"
            name="logradouro"
            value={this.state.cliente.endereco.logradouro}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            value={this.state.cliente.endereco.bairro}
            placeholder="Bairro"
            name="bairro"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            name="localidade"
            value={this.state.cliente.endereco.localidade}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="UF"
            name="uf"
            value={this.state.cliente.endereco.uf}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            name="complemento"
            value={this.state.cliente.endereco.complemento}
            onChange={this.handleChange}
          />
          {this.state.cliente.emails.map((email,index) =>(
            <input
            key={index}
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.addEmail}
            value={email}
          />
          ))}
          {this.state.cliente.telefones.map((telefone,index) =>(
              <div key={index}>
              <label>Escolha o Tipo De Telefone</label>
              <select id="tipo" name="tipoTelefone" value={telefone.tipoTelefone} onChange={this.handleChangeTelefone1} required>
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
                value={telefone.ddd}
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                name="numeroTelefone"
                maxLength="9"
                onChange={this.handleChangeTelefone1}
                value={telefone.numeroTelefone}
                required
              />
              </div>
          ))}
          
          <button type="submit">Alterar Cliente</button>
          <hr />
        </Form>
      </Container>
    );
  }
}

export default Alterar;