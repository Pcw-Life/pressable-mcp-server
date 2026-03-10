import workerModule from "./index-worker.js";

const worker = workerModule?.default ?? workerModule;

export default {
  fetch(request, env, ctx) {
    return worker.fetch(request, env, ctx);
  }
};
