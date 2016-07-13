import st from '../utils/storage';

class LanesModel {
  constructor () {
    this.lanes = st.get('app') || [
      {
        title: "Todo",
        identifier: "todoLane"
      }, {
        title: "In Progress",
        identifier: "inprogressLane"
      }, {
        title: "Done",
        identifier: "doneLane"
      }
    ];
  }

  storeLanes(data) {
    // Store in local storage
    st.set('app', data || this.lanes);
  }
  
  getAllTaskCount() {
    let count = 0;
    this.lanes.map(lane => {
      count += lane.tasks ? lane.tasks.length : 0;
    });

    return count;
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

    this.storeLanes();
  }

  bindEvents(data, callback) {
    Array.observe(data, callback);
  }

  addTaskTolane(laneId, task) {
    const lanes = this.lanes.map(lane => {
      if (lane.tasks && lane.tasks.includes(task)) {
        lane.tasks = lane.tasks.filter(taskObj => taskObj !== task);
      }
      if (lane.id === laneId) {
        if (lane.tasks && lane.tasks.includes(task)) {
          console.warn('Already attached task to lane', lanes);
        } else {
          lane.tasks = lane.tasks || [];
          lane.tasks.push(task);
        }
      }
      return lane;
    });

    this.storeLanes(lanes);
  }

  removeTaskFromLane(laneId, task){
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.tasks = lane.tasks.filter(taskObj => taskObj !== task);
      }
      return lane;
    });


    this.storeLanes(lanes);
  }
}

export default new LanesModel();
