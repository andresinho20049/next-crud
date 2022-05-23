import Cliente from "../core/Cliente"
import { IconeDelete, IconeEdit } from "./Icones"

interface TabelaProps {
    clientes: Cliente[]
    editAction: (cliente: Cliente) => void
    deleteAction: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                <th className="text-center p-4">Ações</th>
            </tr>
        )
    }

    function renderizarDados() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr className={`${i % 2 == 0 ? 'bg-purple-200' : 'bg-purple-100'}`} key={cliente.id}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {renderizarAcoes(cliente)}
                </tr>
            )
        })
    }

    function renderizarAcoes(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                <button onClick={() => props.editAction(cliente)} className={`flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1`}>
                    {IconeEdit}
                </button>
                <button onClick={() => props.deleteAction(cliente)} className={`flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1`}>
                    {IconeDelete}
                </button>
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
            text-gray-100 
            bg-gradient-to-r from-purple-500 to-purple-800`}>
                {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}