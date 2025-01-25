import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AgendamentoProfissional from './components/AgendamentoProfissional';
import BloquearHorario from './components/BloquearHorario';
import CatalogoServicos from './components/CatalogoServicos';
import AgendamentosPrestador from './components/AgendamentosPrestador';

function App() {
  return (
    <Switch>
      <Route path="/profissional/:id" component={AgendamentoProfissional} />
      <Route path="/bloqueio/:profissionalId" component={BloquearHorario} />
      <Route path="/catalogo/:profissionalId" component={CatalogoServicos} />
      <Route path="/agendamentos/:profissionalId" component={AgendamentosPrestador} />
    </Switch>
  );
}

export default App;
