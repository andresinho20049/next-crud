import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/clienteRepositorio";
import useViewTable from "./useViewTable";

export default function useCliente() {

    const { formularioVisivel, tabelaVisivel, exibirTabela, exibirForm } = useViewTable();

    const repo: ClienteRepositorio = new ColecaoCliente()

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());

    useEffect(refreshTabela, [])

    function refreshTabela() {
        repo.findAll().then(clientes => {
            setClientes(clientes);
            exibirTabela();
        })

    }

    function updateCliente(cliente: Cliente) {
        setCliente(cliente);
        exibirForm();
    }

    function novoCliente() {
        setCliente(Cliente.vazio())
        exibirForm();
    }

    async function deleteCliente(cliente: Cliente) {
        await repo.excluir(cliente);
        refreshTabela();
    }

    return {
        cliente,
        clientes,
        tabelaVisivel,
        novoCliente,
        updateCliente,
        deleteCliente,
        refreshTabela
    }
}