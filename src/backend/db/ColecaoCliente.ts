import { firestore } from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/clienteRepositorio";
import { addDoc, collection, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, QueryDocumentSnapshot, SnapshotOptions, updateDoc } from "firebase/firestore";

const clienteCollection = collection(firestore, 'cliente');
export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        }, 
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }

    async salvar(cliente: Cliente): Promise<void> {
        if(cliente?.id) {
            const clienteDoc = doc(firestore, `cliente/${cliente.id}`);
            await updateDoc(clienteDoc, {
                nome: cliente.nome,
                idade: cliente.idade
            });
        } else {
            await addDoc(this.colecao(), cliente);
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        const docDel = doc(firestore, `cliente/${cliente.id}`);

        await deleteDoc(docDel);
    }

    async findAll(): Promise<Cliente[]> {

        const allQuery = query(this.colecao());

        const querySnapshot = await getDocs(allQuery);
        
        return querySnapshot.docs.map(doc => doc.data()) ?? [];
    }

    private colecao() {
        return clienteCollection.withConverter(this.#conversor);
    }
}