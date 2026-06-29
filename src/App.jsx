import { useState } from 'react';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');

  // Dados simulados
  const [grupos, setGrupos] = useState([
    { id: 1, nome: 'App de Biblioteca', disciplina: 'IHC', vagas: 2, total: 4, solicitado: false },
    { id: 2, nome: 'API de Notas', disciplina: 'Projeto Detalhado de Software', vagas: 1, total: 5, solicitado: false },
    { id: 3, nome: 'Banco de Dados Clínico', disciplina: 'Banco de Dados', vagas: 3, total: 4, solicitado: false }
  ]);

  const [solicitacoes, setSolicitacoes] = useState([
    { id: 1, nome: 'Mariana Costa', curso: 'Engenharia de Software', semestre: '5º Semestre', nota: 5, status: 'pendente' },
    { id: 2, nome: 'Carlos Silva', curso: 'Redes de Computadores', semestre: '4º Semestre', nota: 3, status: 'pendente' }
  ]);

  const [filtroDisciplina, setFiltroDisciplina] = useState('Todas');
  const [novoGrupo, setNovoGrupo] = useState({ nome: '', disciplina: '', vagas: '4', descricao: '' });
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Funções de Interatividade
  const solicitarEntrada = (id) => {
    setGrupos(grupos.map(g => g.id === id ? { ...g, solicitado: true } : g));
    alert('Solicitação enviada com sucesso!');
  };

  const criarGrupo = (e) => {
    e.preventDefault();
    if (!novoGrupo.nome || !novoGrupo.disciplina) return alert('Preencha os campos principais!');

    const grupoCriado = {
      id: grupos.length + 1,
      nome: novoGrupo.nome,
      disciplina: novoGrupo.disciplina,
      vagas: parseInt(novoGrupo.vagas),
      total: parseInt(novoGrupo.vagas),
      solicitado: false
    };
    setGrupos([grupoCriado, ...grupos]);
    setMensagemSucesso('Grupo criado! Vá para a aba Gestão para ver os detalhes.');
    setNovoGrupo({ nome: '', disciplina: '', vagas: '4', descricao: '' });
  };

  const avaliarSolicitacao = (id, aprovado) => {
    setSolicitacoes(solicitacoes.map(s => s.id === id ? { ...s, status: aprovado ? 'aprovado' : 'recusado' } : s));
  };

  // Telas
  const TelaHome = () => (
      <div className="p-4 space-y-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">Seja bem-vindo(a) ao TeamU!</h2>
          <p className="mt-2 text-blue-100">Você tem 2 trabalhos pendentes nesta semana.</p>
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">Seus Trabalhos</h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="font-bold text-gray-800">Trabalho Prático - MVP</h4>
              <p className="text-sm text-gray-500">Disciplina: IHC</p>
              <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">Buscando membros</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="font-bold text-gray-800">Reengenharia SIGAE</h4>
              <p className="text-sm text-gray-500">Disciplina: Projeto Detalhado de Software</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">Equipe Completa</span>
            </div>
          </div>
        </div>
      </div>
  );

  const TelaBuscar = () => {
    const gruposFiltrados = filtroDisciplina === 'Todas' ? grupos : grupos.filter(g => g.disciplina === filtroDisciplina);

    return (
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Encontrar Grupos</h2>
          <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              value={filtroDisciplina}
              onChange={(e) => setFiltroDisciplina(e.target.value)}
          >
            <option value="Todas">Todas as disciplinas</option>
            <option value="IHC">IHC</option>
            <option value="Projeto Detalhado de Software">Projeto Detalhado de Software</option>
            <option value="Banco de Dados">Banco de Dados</option>
          </select>

          <div className="space-y-4">
            {gruposFiltrados.map(grupo => (
                <div key={grupo.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{grupo.nome}</h4>
                      <p className="text-sm text-gray-500">{grupo.disciplina}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                  {grupo.vagas}/{grupo.total} vagas
                </span>
                  </div>
                  <button
                      onClick={() => solicitarEntrada(grupo.id)}
                      disabled={grupo.solicitado}
                      className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${grupo.solicitado ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {grupo.solicitado ? 'Solicitação Enviada' : 'Solicitar Entrada'}
                  </button>
                </div>
            ))}
          </div>
        </div>
    );
  };

  const TelaCriar = () => (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Criar Novo Grupo</h2>
        {mensagemSucesso && <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">{mensagemSucesso}</div>}

        <form onSubmit={criarGrupo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="Ex: App de Gestão" value={novoGrupo.nome} onChange={e => setNovoGrupo({...novoGrupo, nome: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Disciplina</label>
            <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" placeholder="Ex: IHC" value={novoGrupo.disciplina} onChange={e => setNovoGrupo({...novoGrupo, disciplina: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total de Integrantes</label>
            <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-white" value={novoGrupo.vagas} onChange={e => setNovoGrupo({...novoGrupo, vagas: e.target.value})}>
              <option value="2">2 pessoas</option>
              <option value="3">3 pessoas</option>
              <option value="4">4 pessoas</option>
              <option value="5">5 pessoas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição / Perfil desejado</label>
            <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-lg" rows="3" placeholder="O que o grupo espera dos membros?" value={novoGrupo.descricao} onChange={e => setNovoGrupo({...novoGrupo, descricao: e.target.value})}></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Publicar Grupo</button>
        </form>
      </div>
  );

  const TelaPerfil = () => (
      <div className="p-4 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Meu Perfil</h2>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">PJ</div>
          <h3 className="text-xl font-bold text-gray-800">Paulo João</h3>
          <p className="text-gray-500">Projeto Detalhado de Software</p>
          <p className="text-gray-500 text-sm">5º Semestre</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <h4 className="font-bold text-yellow-800 text-center">Nota de Comprometimento</h4>
          <div className="flex justify-center text-yellow-500 text-2xl my-2">★★★★☆</div>
          <p className="text-center text-sm text-yellow-700">4.5 de 5.0 (Baseado no seu IRA e feedback de colegas)</p>
        </div>
      </div>
  );

  const TelaGestao = () => (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Gestão do Grupo</h2>

        <div className="space-y-4">
          {solicitacoes.map(solicitacao => (
              <div key={solicitacao.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-bold text-gray-800">{solicitacao.nome}</h4>
                <p className="text-sm text-gray-500">{solicitacao.curso} - {solicitacao.semestre}</p>
                <p className="text-sm text-yellow-500 my-1">{'★'.repeat(solicitacao.nota)}{'☆'.repeat(5 - solicitacao.nota)} ({solicitacao.nota}.0)</p>

                {solicitacao.status === 'pendente' ? (
                    <div className="flex space-x-2 mt-3">
                      <button onClick={() => avaliarSolicitacao(solicitacao.id, true)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold text-sm">Aprovar</button>
                      <button onClick={() => avaliarSolicitacao(solicitacao.id, false)} className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-bold text-sm">Recusar</button>
                    </div>
                ) : solicitacao.status === 'aprovado' ? (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
                      <p className="text-green-800 text-sm font-bold mb-2">Aluno Aprovado!</p>
                      <a href="#" className="text-blue-600 text-sm font-bold underline">Enviar link do WhatsApp</a>
                    </div>
                ) : (
                    <div className="mt-3 p-2 bg-red-50 text-red-800 text-center rounded text-sm font-bold">Solicitação Recusada</div>
                )}
              </div>
          ))}
        </div>
      </div>
  );

  // Navegação Inferior
  return (
      <div className="bg-gray-100 min-h-screen font-sans flex justify-center">
        <div className="w-full md:max-w-md bg-gray-50 h-screen flex flex-col shadow-2xl relative">

          {/* Cabeçalho */}
          <header className="bg-white p-4 shadow-sm z-10 flex justify-between items-center">
            <h1 className="text-xl font-black text-blue-600">TeamU</h1>
            <span className="text-xs font-bold text-gray-400">UFC MVP</span>
          </header>

          {/* Área Principal com Scroll */}
          <main className="flex-1 overflow-y-auto pb-20">
            {telaAtiva === 'home' && <TelaHome />}
            {telaAtiva === 'buscar' && <TelaBuscar />}
            {telaAtiva === 'criar' && <TelaCriar />}
            {telaAtiva === 'perfil' && <TelaPerfil />}
            {telaAtiva === 'gestao' && <TelaGestao />}
          </main>

          {/* Menu Inferior */}
          <nav className="bg-white border-t border-gray-200 flex justify-around p-3 absolute bottom-0 w-full">
            <button onClick={() => setTelaAtiva('home')} className={`flex flex-col items-center ${telaAtiva === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="text-xl">🏠</span><span className="text-[10px] font-bold mt-1">Home</span>
            </button>
            <button onClick={() => setTelaAtiva('buscar')} className={`flex flex-col items-center ${telaAtiva === 'buscar' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="text-xl">🔍</span><span className="text-[10px] font-bold mt-1">Buscar</span>
            </button>
            <button onClick={() => setTelaAtiva('criar')} className={`flex flex-col items-center ${telaAtiva === 'criar' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="text-xl">➕</span><span className="text-[10px] font-bold mt-1">Criar</span>
            </button>
            <button onClick={() => setTelaAtiva('perfil')} className={`flex flex-col items-center ${telaAtiva === 'perfil' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="text-xl">👤</span><span className="text-[10px] font-bold mt-1">Perfil</span>
            </button>
            <button onClick={() => setTelaAtiva('gestao')} className={`flex flex-col items-center ${telaAtiva === 'gestao' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="text-xl">⚙️</span><span className="text-[10px] font-bold mt-1">Gestão</span>
            </button>
          </nav>

        </div>
      </div>
  );
}