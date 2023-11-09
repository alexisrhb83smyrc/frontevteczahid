import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label } from 'reactstrap';

// calcula la edad intento 1
// const fechann = document.getElementById("fechann");
// const edad = document.getElementById("edad");

// const calcularEdad=(fechann)=>{
//   const fechaA=new Date();
//   const anoA=parseInt(fechaA.getFullYear());
//   const mesA=parseInt(fechaA.getMonth())+1;
//   const diaA=parseInt(fechaA.getDate());

// //Formato 2023-11-08
//   const anoN=parseInt(String(fechann).substring(0, 4));        //posisiones de la 0 a la 4
//   const MesN=parseInt(String(fechann).substring(5, 7));        //posisiones de la 5 a la 7
//   const diaN=parseInt(String(fechann).substring(8, 10));       //posisiones de la 8 a la 10

//   let edad =anoA-anoN;
//   if(mesA<MesN){
//     edad--;
//   }else if(mesA==MesN){
//     if(diaA<diaN){
//       edad--;
//     }
//   }

// return edad;
// };


// "Base de datos" osea el array pe
const data = [
  { id: 1, personaje: "Naruto", fechann: "12-Mayo-1999", direccion: "Konoha", edad: "24", anime: "Naruto", foto: "base64" },
  { id: 2, personaje: "Seto Kaiba", fechann: "25-octubre-1998", direccion: "Sierra Tarahumara", edad: "25", anime: "YUGIOH", foto: "base64" },
  { id: 3, personaje: "Ichigo", fechann: "15-Julio-1988", direccion: "Pueblo Karakura", edad: "35", anime: "Bleach", foto: "base64" },
  { id: 4, personaje: "Koro Sense", fechann: "12-Marzo-1993", direccion: "Kunugigaoka", edad: "29", anime: "Assassination Classroom", foto: "base64" },
  { id: 5, personaje: "Mikasa", fechann: "10-febrero-1999", direccion: "Muralla Maria", edad: "24", anime: "Attack On Titan", foto: "base64" },
  { id: 6, personaje: "Lawliet", fechann: "31-octubre-1979", direccion: "Inglaterra", edad: "24", anime: "Death Note", foto: "base64" },
];


class App extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      personaje: '',
      fechann: '',
      direccion: '',
      edad: '',
      anime: '',
      foto: ''
    },
    modalInsertar:false,
    modalEditar:false,
  };
  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }
  // Modal Add
  mostrarModalInsertar=()=>{
    this.setState({modalInsertar:true});
  }
  ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
  }
  // Modal Editar
  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form:registro});
  }
  ocultarModalEditar=()=>{
    this.setState({modalEditar:false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});

  }
  editar=(dato)=>{
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].personaje=dato.personaje;
        lista[contador].fechann=dato.fechann;
        lista[contador].direccion=dato.direccion;
        lista[contador].edad=dato.edad;
        lista[contador].anime=dato.anime;
        lista[contador].foto=dato.foto;

      }
      contador++;
    });
    this.setState({data:lista, modalEditar: false});
  }
  eliminar=(dato)=>{
    var opcion=window.confirm("Estas seguro de borrarme?? 7u7");
    if(opcion){
      var contador=0;
      var lista= this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
        lista.splice(contador,1);
        }
        contador++;
      });
      this.setState({data:lista});
    }
  }
  //Calcula la edad intento 2
  handleFechaDeNacimientoChange = (event) => {
    const fechaNacimiento = new Date(event.target.value);
    const fechaHoy = new Date();
    const edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
  
    // Comprueba si el cumpleaños ya ha ocurrido este año
    if (
      fechaNacimiento.getMonth() > fechaHoy.getMonth() ||
      (fechaNacimiento.getMonth() === fechaHoy.getMonth() &&
        fechaNacimiento.getDate() > fechaHoy.getDate())
    ) {
      edad--;
    }
  
    this.setState({
      fechaDeNacimiento: event.target.value,
      edad: edad,
    });
  };
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Add New Character</Button>
          <br />
          <br />
          <Table>
            <thead><tr>
              <th>Id</th>
              <th>Personaje</th>
              <th>Fecha De Nacimiento</th>
              <th>Direccion</th>
              <th>Edad</th>
              <th>Anime</th>
              <th>Foto</th>
            </tr></thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.fechann}</td>
                  <td>{elemento.direccion}</td>
                  <td>{elemento.edad}</td>
                  <td>{elemento.anime}</td>
                  <td>{elemento.foto}</td>
                  <td>
                    <Button color='primary' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{" "}    {/* aqui mandamos a llamar el modal para editar */}
                     <Button color='danger' onClick={()=>this.eliminar(elemento)}>Eliminar</Button>               {/* aqui mandamos a llamar la funcion eliminar */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

{/* Add New Register */}

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Add New Register</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Personaje: </label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <label>Fecha De Nacimiento: </label>
              <input className="form-control" name="fechann" type="date" onChange={this.handleFechaDeNacimientoChange=this.handleChange} value={this.state.fechaDeNacimiento} />
              {/* <input type="date" value={this.state.fechaDeNacimiento} onChange={this.handleFechaDeNacimientoChange}/> */}
            </FormGroup>
            
            <FormGroup>
              <label>Direccion: </label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <label>Edad: </label>
              <input className="form-control" name="edad" type="text" onChange={this.handleChange}/>
            </FormGroup> 
            <FormGroup>
              <label>Anime: </label>
              <input className="form-control" name="anime" type="text"onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <label>Foto: </label>
              <input className="form-control" name="foto" type="img"onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button> {/* Aqui confirmamos el Add */}
            <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button> 
          </ModalFooter>
        </Modal>
{/* Edit Register */}
<Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Edit Register</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>Personaje: </label>
              <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje}/>
            </FormGroup>

            <FormGroup>
              <label>Fecha De Nacimiento: </label>
              <input className="form-control" name="fechann" type="date" onChange={this.handleChange} value={this.state.form.fechann}/>
            </FormGroup>

            <FormGroup>
              <label>Direccion: </label>
              <input className="form-control" name="direccion" type="text" onChange={this.handleChange} value={this.state.form.direccion}/>
            </FormGroup>
            <FormGroup>
              <label>Edad: </label>
              <input className="form-control" name="edad" type="text" onChange={this.handleChange} value={this.state.form.edad}/>
            </FormGroup>
            <FormGroup>
              <label>Anime: </label>
              <input className="form-control" name="anime" type="text"onChange={this.handleChange} value={this.state.form.anime}/>
            </FormGroup>
            <FormGroup>
              <label>Foto: </label>
              <input className="form-control" name="foto" type="img"onChange={this.handleChange} value={this.state.form.foto}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={()=>this.editar(this.state.form)}>Editar</Button>  {/* Aqui confirmamos la edit */}
            <Button color='danger' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
