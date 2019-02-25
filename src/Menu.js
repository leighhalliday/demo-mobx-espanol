import React from "react";
import { inject, observer } from "mobx-react";

class Menu extends React.Component {
  nombreRef = React.createRef();
  fotoRef = React.createRef();

  render() {
    const { ArepaStore } = this.props;

    return (
      <div>
        <h1>Tenemos {ArepaStore.numeroArepas} arepas</h1>

        <button
          onClick={() => {
            ArepaStore.borrar();
          }}
        >
          Borrar Todas Las Arepas
        </button>

        <form
          onSubmit={e => {
            e.preventDefault();

            ArepaStore.agregarArepa({
              nombre: this.nombreRef.current.value,
              foto: this.fotoRef.current.value
            });

            e.target.reset();
          }}
        >
          <input
            type="text"
            placeholder="Nombre de arepa"
            required
            ref={this.nombreRef}
          />
          <input
            type="text"
            placeholder="Foto URL de arepa"
            required
            ref={this.fotoRef}
          />
          <button typo="submit">Agregar</button>
        </form>

        <ul>
          {ArepaStore.arepas.map(arepa => (
            <li key={arepa.nombre}>
              <h2>{arepa.nombre}</h2>
              <img
                src={arepa.foto}
                alt={arepa.nombre}
                style={{ maxWidth: "150px" }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default inject("ArepaStore")(observer(Menu));
