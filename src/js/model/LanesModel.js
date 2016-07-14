import st from '../utils/storage';
import './../../../node_modules/object.observe/dist/object-observe-lite';
import './../../../node_modules/array.observe/array-observe';

class LanesModel {
  constructor() {
    this.lanes = st.get('app') || [
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
    id = id || "todoLane";
    return this.lanes.find(lane => lane.identifier == id);
  }

  addTask(task, laneId) {
    let lane = this.getLane(laneId);
    lane.tasks = lane.tasks || [];
    lane.tasks.push(task);

    this.storeLanes();
  }

  getTaskObject(taskId) {
    let self = this, task;
    self.lanes.map(lane => {
      lane.tasks && lane.tasks.map(taskObj => {
        if (task) return;
        task = (taskObj.identifier == taskId) ? taskObj : false;
      });
    });
    return task;
  }

  addTaskToLane(laneId, taskId) {
    const task = this.getTaskObject(taskId);

    for(let i=0, len = this.lanes.length; i<len;i++) {
      let lane = this.lanes[i];
      const laneHasTask = lane.tasks && lane.tasks.includes(task);
      if (laneHasTask) {
        lane.tasks = lane.tasks.filter(taskObj => taskObj.identifier != task.identifier);
      }

      if (lane.identifier == laneId) {
        if (!laneHasTask) {
          lane.tasks = lane.tasks || [];
          lane.tasks.push(task);
        }
      }
    }

    this.storeLanes(this.lanes);
  }

  bindEvents(data, callback) {
    data = data || this.lanes;
    Array.observe(data, callback);
  }

  bindEventOnAll(callback) {
    for(let i=0, len = this.lanes.length; i<len;i++) {
      let lane = this.lanes[i];
      this.bindEvents(lane.tasks, callback);
    }
  }

  rebindAll(callback) {
    // This is required for the garbage collection and let the observe work in right way, due to some issues.
    for(let i=0, len = this.lanes.length; i<len;i++) {
      let lane = this.lanes[i];
      Array.unobserve(lane.tasks, callback);
    }

    this.bindEventOnAll(callback);
  }
}

export default new LanesModel();
