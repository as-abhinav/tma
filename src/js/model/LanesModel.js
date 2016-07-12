import st from '../utils/storage';

class LanesModel {
  constructor () {
    this.lanes = st.get('app') || [
      {
        title: "Todo",
        identifier: "todoLane",
        tasks: [{
          identifier: "random",
          title: "First Task"
        }]
      }, {
        title: "In Progress",
        identifier: "inprogressLane"
      }, {
        title: "Done",
        identifier: "doneLane"
      }
    ];
  }

  getLanes() {
    return this.lanes;
  }

  getLane(id) {
    // return default todolane
    id = id ||  "todoLane";
    return this.lanes.find(function(lane){
      return lane.identifier === id;
    });
  }

  addTask(task, laneId) {
    let lane = this.getLane(laneId);
    lane.tasks = lane.tasks || [];
    lane.tasks.push(task);
    st.set('app', this.lanes);
  }

  bindEvents(data, callback) {
    Array.observe(data, callback);
  }
}

export default new LanesModel();
