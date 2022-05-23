interface EntradaProps {
    tipo?: 'text' | 'number'
    texto: string
    valor: any
    somenteLeitura?: boolean
    setValor?: (valor: any) => void
}

export default function Entrada(props: EntradaProps) {
    return (
        <div className={`flex flex-col`}>
            <label className="mb-4 ">
                {props.texto}
            </label>
            <input
                onChange={e => props.setValor?.(e.target.value)}
                className={`border border-purple-500 rounded-lg focus:outline-none bg-gray-50 px-4 py-2 ${props.somenteLeitura ? '' : 'focus:bg-white'}`}
                type={props.tipo ?? 'text'}
                value={props.valor}
                readOnly={props.somenteLeitura ?? false}
            />
        </div>
    )
}