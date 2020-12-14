import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Login from '../login'

import './detalhar.css'

export default class Detalhar extends Component {

    state = {
        cliente: {
            idCliente:"",
            nome:"",
            cpf:"",
            enderecos: [],
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
            this.error.tokenExpirou=true;
        })
        
    }

    deleteCliente = () =>{
        const {id} = this.state.cliente;

        api.delete(`/cliente?id=${id}`).then(response =>{
            if(response.ok)
            this.props.history.push("/lista");
        }).catch(error =>{
            alert("Erro ao deletar");
        })
    }

    render() {
        const {cliente} = this.state;

        if(!this.error.tokenExpirou){
        return (
            <div className="cliente-info">
                <h1>{cliente.nome}</h1>
                <h1>{cliente.cpf}</h1>
                <div>
                {cliente.enderecos.map((end,index) =>(
                    <div key={index}>
                    <h1>{end.cep}</h1>
                    <h1>{end.logradouro}</h1>
                    <h1>{end.bairro}</h1>
                    <h1>{end.cidade}</h1>
                    <h1>{end.uf}</h1>
                    <h1>{end.complemento}</h1>
                    </div>
                ))}
                </div>
                {cliente.emails.map(email =>(
                    <div>
                        <h1>Email : {email}</h1>
                    </div>
                ))}
                {cliente.telefones.map(tel =>(
                    <div>
                        <h1>Tipo Telefone : {tel.tipoTelefone}</h1>
                        <h1>Numero Telefone : {tel.numeroTelefone}</h1>
                        <h1>DDD : {tel.ddd}</h1>
                    </div>
                ))}

                <button onClick={this.deleteCliente()}> Deletar Cliente </button>
            </div>
        )}
        else{
            return <Login error={this.error.tokenExpirou}/>
        }
    }
}