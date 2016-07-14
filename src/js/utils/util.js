export default {
  getCountOfObjInModel: (model, key, objId) => {
    let c = 0;
    model.map(m => {
      m[key].map(o => {
        c += o.length;
      })
    });

    return c;
  }
}