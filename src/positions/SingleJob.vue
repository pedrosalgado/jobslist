<template>
  <div class="main-attributes">
    <img :src="imageUrl" class="image" />
    <div class="job-data">
      <div class="company">
        {{ job.company }}
        <span v-if="job.new" class="new-job">NEW!</span>
        <span v-if="job.featured" class="featured-job">FEATURED</span>
      </div>
      <div class="position">{{ job.position }}</div>
      <div class="details">
        <span>{{ job.postedAt }}</span> . <span>{{ job.contract }}</span> .
        <span>{{ job.location }}</span>
      </div>
    </div>
  </div>
  <div class="filter-tags">
    <div class="tags-container">
      <span @click="addRole(job.role)">{{ job.role }}</span>
      <span @click="addLevel(job.level)">{{ job.level }}</span>
      <span
        v-for="language in job.languages"
        :key="language.id"
        @click="addLanguage(language)"
      >
        {{ language }}
      </span>
      <span v-for="tool in job.tools" :key="tool.id" @click="addTool(tool)">
        {{ tool }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobsList",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    job: {
      type: Object,
      required: true,
    },
  },
  computed: {
    jobPosition() {
      return this.job.position;
    },
  },
  methods: {
    addRole(role) {
      this.$store.commit("addRole", role);
    },
    addLevel(level) {
      this.$store.commit("addLevel", level);
    },
    addLanguage(language) {
      this.$store.commit("addLanguage", language);
    },
    addTool(tool) {
      this.$store.commit("addTool", tool);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-attributes {
  display: flex;
  width: 50%;
  align-items: center;
  img {
    padding-left: 2rem;
  }
  div {
    padding: 0 1rem;
  }
  .job-data {
    width: 290px;
    text-align: left;
    .company {
      color: #509e9b;
      font-weight: bold;
      font-size: 0.875rem;
      .new-job,
      .featured-job {
        color: #fff;
        border-radius: 0.5rem;
        padding: 0.25rem;
        font-size: 0.5rem;
        margin: 0 0.5rem;
      }
      .featured-job {
        background-color: #333;
      }
      .new-job {
        background-color: #509e9b;
      }
    }
    .position {
      font-weight: bolder;
      margin: 0.25rem 0;
      font-size: 1.05rem;
    }
    .details {
      font-size: 0.75rem;
    }
  }
}
.filter-tags {
  width: 50%;
  align-items: center;
  justify-content: right;
  display: flex;
  padding-right: 2rem;
}
.filter-tags span {
  padding: 0 1rem;
}
.tags-container span {
  color: #509e9b;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #e6fefe;
  padding: 0.5rem;
  margin: 0 0.75rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 38%);
  border-radius: 0.25rem;
  &:hover {
    cursor: pointer;
    background-color: #509e9b;
    color: #fff;
  }
}

@media only screen and (max-width: 800px) {
  .main-attributes {
    width: 100%;
  }
  .filter-tags {
    justify-content: left;
    margin-top: 2rem;
    width: 100%;
  }
}
</style>
