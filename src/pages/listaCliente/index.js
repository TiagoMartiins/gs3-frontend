import React, { useState, useEffect } from 'react'

import {Link} from 'react-router-dom';

import api from '../../services/api'

import './lista.css'

function ListaCliente() {
  const [list, setList] = useState([])

  async function handleListaCliente() {
    await api.get('/cliente').then(response => {
        setList(response.data)
        console.log(response.data);
    }).catch(error =>{
        alert("Usuario não autenticado");
    })
  }
  
  function deleteCliente (id) {
    console.log(id);
    api.delete(`/cliente?id=${id}`).then(response =>{
        if(response.ok)
        alert("Cliente deletado com sucesso");
        window.location.href="/lista";
    }).catch(error =>{
        alert("Você não tem permissão para deletar um cliente");
    })
  }

  useEffect(() => {
    handleListaCliente()
  }, [])

  return (
        <ul>
          {list.map((x,index) => (
            <div className="lista-list">
              <div key={index}>
                  <h1>Nome: <label> {x.nome} </label></h1>
                  <article>
                      <label>CPF: </label>  
                      <strong>{x.cpf}</strong>
                      <label> Emails :</label>
                      {x.emails.map((email, index) => (
                          <strong>{email}</strong>
                      ))}
                      <p><Link to={`/detalhar/${x.idCliente}`}>Detalhar</Link></p>
                      <p><Link to={`/alterar/${x.idCliente}`}>Alterar</Link></p>
                      <button onClick={() => deleteCliente(x.idCliente)}>Deletar Cliente</button>
                      <br />
                  </article>
              </div>
            </div>
          ))}
        </ul>
  )
}

export default ListaCliente