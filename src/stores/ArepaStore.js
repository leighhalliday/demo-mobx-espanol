import { decorate, observable, action, computed, reaction } from "mobx";

class ArepaStore {
  constructor() {
    this.arepas = [];
    const localArepas = localStorage.getItem("arepas");
    if (localArepas) {
      console.log(localArepas);
      this.arepas = JSON.parse(localArepas);
    }
  }

  agregarArepa = arepa => {
    this.arepas.push(arepa);
  };

  borrar = () => {
    this.arepas = [];
  };

  get numeroArepas() {
    return this.arepas.length;
  }
}

decorate(ArepaStore, {
  arepas: observable,
  agregarArepa: action,
  borrar: action,
  numeroArepas: computed
});

const arepaStore = new ArepaStore();

reaction(
  () => JSON.stringify(arepaStore.arepas),
  arepasStr => {
    localStorage.setItem("arepas", arepasStr);
  }
);

export default arepaStore;
