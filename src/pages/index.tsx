import type { NextPage } from 'next'
import Botao from '../components/Botao'
import Formulario from '../components/Formulario'
import Layout from '../components/Layout'
import Tabela from '../components/tabela'
import useCliente from '../hooks/useCliente'

const Home: NextPage = () => {

  const { cliente, clientes, tabelaVisivel, novoCliente, updateCliente, deleteCliente, refreshTabela } = useCliente()

  // 1362780286

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo='Cadastro Simples'>

        {tabelaVisivel ? (
          <>
            <div className='flex justify-end'>
              <Botao className='mb-4' onClick={novoCliente}>Novo Cliente</Botao>
            </div>
            <Tabela clientes={clientes} editAction={updateCliente} deleteAction={deleteCliente}/>
          </>
        ) : (
          <Formulario cliente={cliente} cancel={refreshTabela}/>
        )}
      </Layout>
    </div>
  )
}

export default Home
