import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/favicon.ico';

function App() {

  const baseUrl="https://localhost:44328/api/Pessoas";
  const [data, setData]=useState([]);

  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  })

   return (
     <div className="App">
     <br/>
     <h3>Cadastro</h3>
     <header className="App-header">
         <img src={logoCadastro} alt='Cadastro' />
         <button className="btn btn-sucess">Incluir</button>
     </header>
     <table className="table table-bordered">
       <thead>
         <tr>
           <th>Id</th>
           <th>Nome</th>
           <th>Email</th>
           <th>Data Nascimento</th>
           <th>DDD Whats</th>
           <th>Whats</th>
           <th>Status</th>
         </tr>
       </thead>
       <tbody>
         {data.map(pessoas=>(
           <tr key={pessoas.id}>
             <td>{pessoas.id}</td>
             <td>{pessoas.nome}</td>
             <td>{pessoas.email}</td>
             <td>{pessoas.dataNascimento}</td>
             <td>{pessoas.dddWhats}</td>
             <td>{pessoas.whats}</td>
             <td>{pessoas.status}</td>
             <td>
               <button className="btn btn primary">[Editar]</button> {" "}
               <button className="btn btn danger">Excluir</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     </div>
   );
 }

export default App;