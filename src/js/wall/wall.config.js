const wallConfig = (() => {
  return {
    lanes: [ {
      title: "Todo",
      identifier: "todoLane"
    }, {
      title: "In Progress",
      identifier: "inprogressLane"
    }, {
      title: "Done",
      identifier: "doneLane"
    }]
  };
})();

export default wallConfig;
