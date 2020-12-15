import React, {Component} from 'react';
import api from '../../services/api'
import  Input from '../../components/input'

import './detalhar.css'

export default class Detalhar extends Component {

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

    error = {
        tokenExpirou : false
    }

    async componentDidMount() {
        const {id} = this.props.match.params;

        console.log(this.props);
        console.log("entroua component did mount");

        await api.get(`/cliente/get?id=${id}`).then(response =>{
            let cliente = response.data;
            this.setState({cliente});
            console.log(response.data);
            console.log(this.state.cliente);
        }).catch(error =>{
            alert("Erro");
            document.getElementById('divCentral').style.display="none";
        })
        
    }

    render() {
        const {cliente} = this.state;

        return (
             <div id="divCentral" className="cliente-info" >
                <label>Nome:</label>
                <h1>{cliente.nome}</h1>
                <label>CPF:</label>
                <h1>{cliente.cpf}</h1>
                <div>
                    <label>CEP: </label> <br />
                    <Input value={cliente.endereco.cep}></Input> <br />
                    <label>Logradouro:</label>
                    <h1>{cliente.endereco.logradouro}</h1>
                    <label>Bairro:</label>
                    <h1>{cliente.endereco.bairro}</h1>
                    <label>Cidade:</label>
                    <h1>{cliente.endereco.cidade}</h1>
                    <label>Endereco:</label>
                    <h1>{cliente.endereco.uf}</h1>
                    <label>Complemento:</label>
                    <h1>{cliente.endereco.complemento}</h1>
                </div>
                {cliente.emails.map((email,index) =>(
                    <div>
                        <label>Email {index+1}:</label>
                        <h1>{email}</h1>
                    </div>
                ))}
                {cliente.telefones.map((tel,index) =>(
                    <div>
                        <label>Telefone {index+1}</label> <br />
                        <hr />
                        <label>Tipo de Telefone:</label>
                        <h1>{tel.tipoTelefone}</h1>
                        <label>Numero de Telefone:</label>
                        <h1>{tel.numeroTelefone}</h1>
                        <label>DDD:</label>
                        <h1>{tel.ddd}</h1>
                    </div>
                ))}
            </div>
        )
    }
}