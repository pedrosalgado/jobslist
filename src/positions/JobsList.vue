<template>
  <div id="app">
    <div class="banner"></div>
    <div v-if="hasFilters" class="filters-container">
      <!-- <div class="active-filters"> -->
      <div class="tags-container">
        <span v-if="selectedFilters.level" @click="removeFilter('level')">
          {{ selectedFilters.level }}
          <img
            class="icon-remove"
            :src="require('/src/assets/images/icon-remove.svg')"
          />
        </span>
        <span v-if="selectedFilters.role" @click="removeFilter('role')">
          {{ selectedFilters.role }}
          <img
            class="icon-remove"
            :src="require('/src/assets/images/icon-remove.svg')"
          />
        </span>
        <span
          v-for="language in selectedFilters.languages"
          :key="language.id"
          @click="removeArrFilter(language, 'languages')"
        >
          {{ language }}
          <img
            class="icon-remove"
            :src="require('/src/assets/images/icon-remove.svg')"
          />
        </span>
        <span
          v-for="tool in selectedFilters.tools"
          :key="tool.id"
          @click="removeArrFilter(tool, 'tools')"
        >
          {{ tool }}
          <img
            class="icon-remove"
            :src="require('/src/assets/images/icon-remove.svg')"
          />
        </span>
      </div>
      <div class="clear-container">
        <span v-if="hasFilters" @click="clearFilters()">Clear</span>
      </div>
      <!-- </div> -->
    </div>
    <div class="sort-order">
      <span class="sort-title">Sort by name:&nbsp;</span>
      <span class="sort-container">
        <span :class="{ selected: isSortAsc }" @click="sortBy('asc')">
          Ascending
        </span>
        <span :class="{ selected: isSortDesc }" @click="sortBy('desc')">
          Descending
        </span>
      </span>
    </div>
    <div
      v-for="job in filterTag(jobs, selectedFilters)"
      :key="job.id"
      class="job"
    >
      <single-job :imageUrl="loadImg(job.logo)" :job="job" />
    </div>
  </div>
</template>

<script>
import json from "../assets/data.json";
import SingleJob from "./SingleJob.vue";

export default {
  name: "JobsList",
  components: {
    SingleJob,
  },
  data() {
    return {
      jobs: json,
      isSortAsc: false,
      isSortDesc: false,
    };
  },
  props: {
    filteredJobs: {
      type: Array,
    },
  },
  computed: {
    selectedFilters() {
      return this.$store.state.filterList;
    },
    hasFilters() {
      return this.$store.getters.hasFilters;
    },
  },
  methods: {
    loadImg(imgPath) {
      return require(`/src/assets${imgPath.substring(1)}`);
    },
    removeFilter(tag) {
      this.$store.commit("removeTag", tag);
    },
    removeArrFilter(tag, type) {
      this.$store.commit("removeArrTag", { tag, type });
    },
    sortBy(sortOrder) {
      if (sortOrder === "asc") {
        this.isSortAsc = true;
        this.isSortDesc = false;
      }
      if (sortOrder === "desc") {
        this.isSortDesc = true;
        this.isSortAsc = false;
      }
      this.$store.commit("addSortOrder", sortOrder);
    },
    clearFilters() {
      this.isSortAsc = false;
      this.isSortDesc = false;
      this.$store.commit("clearFilters");
    },
    filterTag(jobs, tag) {
      const sorOrder = this.$store.state.filterList.sortOrder;

      sorOrder === "desc"
        ? jobs.sort((a, b) => b.id - a.id)
        : jobs.sort((a, b) => a.id - b.id);

      return jobs.filter(
        (item) =>
          (item.role === tag.role || !tag.role) &&
          (item.level === tag.level || !tag.level) &&
          (!tag.languages.length ||
            this.checkContains(item.languages, tag.languages)) &&
          (!tag.tools.length || this.checkContains(item.tools, tag.tools))
      );
    },
    checkContains(array1, array2) {
      return array2.every((v) => array1.includes(v));
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  margin: 0;
  padding: 0;
}

.job,
.filters-container {
  display: flex;
  justify-content: space-around;
  background: #ffffff;
  padding: 2rem 0;
  width: calc(95% - 20px);
  max-width: 1200px;
  margin: 1.25rem auto;
  box-shadow: 0 2px 8px rgb(0 0 0 / 38%);
  border-radius: 0.5rem;
}

.filters-container {
  padding: 1rem 0;
  .tags-container,
  .clear-container {
    display: flex;
    width: 50%;
    &:hover {
      cursor: pointer;
    }
  }
  .icon-remove {
    background-color: #509e9b;
    margin-left: 0.25rem;
  }
  .tags-container {
    justify-content: left;
    padding-left: 2rem;
    span {
      display: flex;
      margin-right: 0.5rem;
      font-size: 0.875rem;
      align-items: center;
      background-color: #e6fefe;
      color: #509e9b;
      box-shadow: 0 2px 8px rgb(0 0 0 / 38%);
      border-radius: 0.25rem;
      padding: 0 0.25rem;
      font-weight: bold;
      &:hover .icon-remove {
        background-color: #333;
      }
    }
  }
  .clear-container {
    justify-content: right;
    padding-right: 2rem;
    &:hover span {
      color: #509e9b;
      text-decoration: underline;
    }
  }
}

.banner {
  height: 156px;
  background-image: url("/src/assets/images/bg-header-desktop.svg");
  background-color: #509e9b;
}

.sort-order {
  width: calc(95% - 20px);
  max-width: 1200px;
  margin: 0 auto;
  justify-content: right;
  display: flex;
  padding-top: 1rem;

  .sort-title {
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .sort-container {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    border: 1px solid #c4c4c4;
    color: #5e5e5ec4;
    background: #fff;
    border-radius: 0.25rem;
    span {
      padding: 0.25rem 0.5rem;
      &:hover,
      &.selected {
        cursor: pointer;
        background-color: #509e9b;
        color: #fff;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .job {
    display: block;
  }
}
</style>
