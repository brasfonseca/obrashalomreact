import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/favicon.ico';

function App() {

  const baseUrl="https://localhost:44328/api/Pessoas";
  const [data, setData]=useState([]);
  const [modalIncluir, setModalIncluir]=useState(false);

  const [pessoaSelecionada, setPessoaSelecionada]=useState({
    id: '',
    nome: '',
    email: '',
    dataNascimento: '',
    dddWhats: '',
    whats: '',
    status: ''
  })

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  const handleChange = e=>{
    const {name, value} = e.target;
    setPessoaSelecionada({
      ...pessoaSelecionada,[name]:value
    });
    console.log(pessoaSelecionada);
  }

  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost = async()=>{
    delete pessoaSelecionada.id;
    await axios.get(baseUrl, pessoaSelecionada)
    .then(response => {
      setData(data.concat(response.data));
      abrirFecharModalIncluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  })

   return (
     <div className="aluno-container">
     <br/>
     <h3>Cadastro</h3>
     <header className="App-header">
         <img src={logoCadastro} alt='Cadastro' />
         <button className="btn btn-sucess" onClick={()=>abrirFecharModalIncluir()}>Incluir</button>
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
               <button className="btn btn primary">Editar</button> {" "}
               <button className="btn btn danger">Excluir</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>

    <Modal isOpen={modalIncluir}>
      <ModalHeader>
        Incluir Pessoa
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nome:</label>
          <br />
          <input type="text" className="form-control" name="nome" onChange={handleChange} />
          <br />
          <label>Email:</label>
          <br />
          <input type="text" className="form-control" name="email" onChange={handleChange} />
          <label>Data Nascimento:</label>
          <br />
          <input type="text" className="form-control" name="dataNascimento" onChange={handleChange} />
          <br />
          <label>DDD Whats:</label>
          <br />
          <input type="text" className="form-control" name="dddWhats" onChange={handleChange} />
          <br />
          <label>Whats:</label>
          <br />
          <input type="text" className="form-control" name="whats" onChange={handleChange} />
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>pedidoPost()}>Incluir</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
    </Modal>

     </div>
   );
 }

export default App;