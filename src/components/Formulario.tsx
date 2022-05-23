import { useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/clienteRepositorio";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
    cliente: Cliente
    cancel?: () => void
}

const repo: ClienteRepositorio = new ColecaoCliente()

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? '')

    async function salvarCliente(cliente:Cliente) {
        await repo.salvar(cliente);
        
        if(props.cancel)
            props.cancel()
    }

    return (
        <div>
            {id ? (
                <Entrada texto="Código" somenteLeitura valor={id} />
            ) : false
            }
            <Entrada texto="Nome" valor={nome} setValor={setNome} />
            <Entrada texto="Idade" valor={idade} tipo="number" setValor={setIdade} />
            <div className="flex justify-end mt-7">
                <Botao onClick={() => salvarCliente(new Cliente(nome, +idade, id))} className="mr-2">{id ? 'Alterar' : 'Salvar'}</Botao>
                <Botao onClick={props.cancel}>Cancelar</Botao>
            </div>
        </div>
    )
}