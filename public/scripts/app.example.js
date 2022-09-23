class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.inputDriveravaiability = document.getElementById("driver")
    this.inputDate = document.getElementById("date")
    this.inputTime = document.getElementById("time")
    this.passangers = document.getElementById("passangers")
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    Car.list.forEach((car) => {
      let dateTime = this.inputDate.value + "T" + this.inputTime.value;
      let formdate = Date.parse(dateTime);
      let waktu = Date.parse(car.availableAt);
      let passangers = this.passangers.value;
      let driver = this.inputDriveravaiability.value;
      if(driver == "true"){
        driver = true;
      }
      else{
        driver = false;
      }

      if(
        car.available == driver &&
        waktu >= formdate &&
        car.capacity >= passangers
      ){
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      }
      
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

