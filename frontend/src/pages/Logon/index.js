import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {

   const [id, setId] = useState('');
   const history = useHistory();

   async function handleLogin(e) {
    e.preventDefault();

    try {
     const response = await api.post('sessions', { id });
     
     localStorage.setItem('ongId', id);
     localStorage.setItem('ongName', response.data.name);

     history.push('/profile');
    } catch (err) {
     alert('Falha no Login'); 
    }
   }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Sua ID" 
                     value={id}
                     onChange={e => setId(e.target.value)} 
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size="16" color="#e02041" />
                            Não tenho cadastro
                    </Link>

                </form>

            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}