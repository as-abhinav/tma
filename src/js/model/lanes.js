class LanesModel {
  constructor () {
    this.lanes = [
      {
        title: "Todo",
        identifier: "todoLane",
        tasks: []
      }, {
        title: "In Progress",
        identifier: "inprogressLane",
        tasks: []
      }, {
        title: "Done",
        identifier: "doneLane",
        tasks: []
      }
    ];
  }
}

export default LanesModel;
