import Cliente from "./Cliente";

export default interface ClienteRepositorio {
    salvar(cliente: Cliente): Promise<void>
    excluir(cliente: Cliente): Promise<void>
    findAll(): Promise<Cliente[]>
}