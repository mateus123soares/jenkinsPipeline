import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from "../../services/api";

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {

    const history = useHistory();

    const ongName = localStorage.getItem('ong');
    const ongId = localStorage.getItem('ongId');
    const token = localStorage.getItem('token');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
            api.get('profile', {
                headers: {
                    authorization: ongId,
                    token: `Bearer ${token}`
                }
            }).then(Response => {
                setIncidents(Response.data);
            }).catch(Response =>{
                alert("Erro de autorização");
                history.push('/');
            })
    }, [ongId, token,history])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert("Erro a deletar o caso, tente novamente");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="To be hero"></img>
                <span>Bem Vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" ></FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}