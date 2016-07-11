class LanesModel {
  constructor () {
    this.lanes = [
      {
        title: "Todo",
        identifier: "todoLane",
        tasks: [{
          identifier: "random",
          title: "First Task"
        }]
      }, {
        title: "In Progress",
        identifier: "inprogressLane",
        tasks: [{
          identifier: "random2",
          title: "Second Task"
        }]
      }, {
        title: "Done",
        identifier: "doneLane",
        tasks: [{
          identifier: "random3",
          title: "Third Task"
        }]
      }
    ];
  }
}

export default LanesModel;
