import React, { useState, useEffect } from 'react'

import {getToken} from '../../services/auth';

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

  useEffect(() => {
    handleListaCliente()
  }, [])

  return (
        <ul>
          {list.map((x,index) => (
            <div className="lista-list">
              <div key={index}>
                  <label>Nome:<h5>{x.nome}</h5></label>
                  
                  <article>
                      <label>CPF: </label>  
                      <strong>{x.cpf}</strong>
                      <label> Emails :</label>
                      {x.emails.map((email, index) => (
                          <strong>{email}</strong>
                      ))}
                      <p><Link to={`/detalhar/${x.idCliente}`}>Detalhar</Link></p>
                      <br />
                  </article>
              </div>
            </div>
          ))}
        </ul>
  )
}

export default ListaCliente