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
  
  getAllTaskCount(selectedLane) {
    let count = 0;
    const lanes = selectedLane ? [selectedLane] : this.lanes;
    lanes.map(lane => {
      count += lane.tasks ? lane.tasks.length : 0;
    });

    return count;
  }

  getLane(id) {
    // return default todolane
    id = id ||  "todoLane";
    return this.lanes.find(lane => lane.identifier === id);
  }

  addTask(task, laneId) {
    let lane = this.getLane(laneId);
    lane.tasks = lane.tasks || [];
    lane.tasks.push(task);

    this.storeLanes();
  }

  bindEvents(data, callback) {
    data = data || this.lanes;
    Array.observe(data, callback);
  }

  getTaskObject(taskId) {
    let self = this, task;
    self.lanes.map(lane => {
      lane.tasks && lane.tasks.map(taskObj => {
        if(task) return;
        task = (taskObj.identifier == taskId) ? taskObj : false;
      });
    });
    return task;
  }

  addTaskToLane(laneId, taskId) {
    const task = this.getTaskObject(taskId);

    const lanes = this.lanes.map(lane => {
      const laneHasTask = lane.tasks && lane.tasks.includes(task);
      if (laneHasTask) {
        lane.tasks = lane.tasks.filter(taskObj => taskObj !== task);
      }

      if (lane.identifier == laneId) {
        if (!laneHasTask) {
          lane.tasks = lane.tasks || [];
          lane.tasks.push(task);
        }
      }
      return lane;
    });

    this.storeLanes(lanes);
  }

  removeTaskFromLane(laneId, taskId){
    const task = this.getTaskObject(taskId);

    const lanes = this.lanes.map(lane => {
      if (lane.identifier == laneId) {
        lane.tasks = lane.tasks.filter(taskObj => taskObj !== task);
      }
      return lane;
    });


    this.storeLanes(lanes);
  }
}

export default new LanesModel();
