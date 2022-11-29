import { createStore } from "vuex";

export default createStore({
  state: {
    filterList: {
      role: "",
      level: "",
      languages: [],
      tools: [],
      sorOrder: "",
    },
  },
  getters: {
    hasFilters(state) {
      const filterList = state.filterList;
      for (const x in filterList) {
        if (filterList[x] !== "" && filterList[x].length !== 0) {
          return true;
        }
      }
      return false;
    },
  },
  mutations: {
    addRole(state, role) {
      state.filterList.role = role;
    },
    addLevel(state, level) {
      state.filterList.level = level;
    },
    addLanguage(state, language) {
      if (!state.filterList.languages.includes(language)) {
        state.filterList.languages.push(language);
      }
    },
    addTool(state, tool) {
      if (!state.filterList.tools.includes(tool)) {
        state.filterList.tools.push(tool);
      }
    },
    removeArrTag(state, value) {
      const index = state.filterList[value.type].indexOf(value.tag);
      if (index > -1) {
        state.filterList[value.type].splice(index, 1);
      }
    },
    removeTag(state, tag) {
      state.filterList[tag] = "";
    },
    addSortOrder(state, sortOrder) {
      state.filterList.sortOrder = sortOrder;
    },
    clearFilters(state) {
      state.filterList = {
        role: "",
        level: "",
        languages: [],
        tools: [],
        sorOrder: "",
      };
    },
  },
  actions: {},
  modules: {},
});
