import React, { Component } from 'react'
import Buscador from './components/Buscador'
import Resultado from './components/Resultado'


class App extends Component{

  state = {
    termino: '',
    imagenes:[],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('auto', 'end');
  }

  paginaAnterior = () => {
    console.log('Anterior....')
    //leer state de pagina actual
    let pagina = this.state.pagina;
    //si la pagina es 1 ya no ir hacia atras
    if(pagina===1)return null; 
    //sumar uno a la pagina actual
    pagina -= 1;
    //agregar el cambio al state
    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.scroll();
    })

    console.log(pagina)
  }

  paginaSiguiente = () =>{
    console.log('Siguiente...')
    //leer state de pagina actual
    let pagina = this.state.pagina;
    //sumar uno a la pagina actual
    pagina += 1;
    //agregar el cambio al state
    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.scroll();
    })

    console.log(pagina)
  }

  consultarApi = () => {
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${this.state.termino}&per_page=30&page=${pagina}`;
    console.log(url);
    

    fetch(url)
    .then(respuesta=> respuesta.json())
    .then(resultado => this.setState({imagenes : resultado.hits}))

  }

  datosBusqueda = (termino) =>{
    console.log(termino);
    this.setState({
      termino:termino,
      pagina: 1
    }, ()=>{this.consultarApi();
    })
  }
  render(){
  return (
    <div className="app container">
      <div  className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Buscador
         datosBusqueda = {this.datosBusqueda}
         />
      </div>
      <div className="row justify-content-center">
        <Resultado
        imagenes={this.state.imagenes}
        paginaAnterior={this.paginaAnterior}
        paginaSiguiente={this.paginaSiguiente}
        />
      </div>
    </div>
  );
}
}

export default App;
