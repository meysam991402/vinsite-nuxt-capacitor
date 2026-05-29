import { defineStore } from "pinia";
export const useStoriesStore = defineStore("useStories", {
  state: () => {
    return {
      stories: null,
      loadingStories: false,
      readStories: [],
      prevStepStories: {},
    };
  },
  getters: {
    getStories(state) {
      return state.stories;
    },
    getLoadingStories(state) {
      return state.loadingStories;
    },
    getReadStories(state) {
      return state.readStories;
    },
    getPrevStepStories(state) {
      return state.prevStepStories;
    },
  },
  actions: {
    async setStories() {
      this.loadingStories = true;
      try {
        const data = await $fetch("/api/stories");
        this.stories = data.stories;
      } catch (error) {
        console.error("❌ خطا در گرفتن داده از /api/stories", error);
      } finally {
        this.loadingStories = false;
      }
    },
    changeLikeCount(option, parentId, likeCount) {
      if (this.stories && this.stories.length) {
        console.log(option, "option");
        let findIndexParent = this.stories.findIndex(
          (item) => item.id == parentId,
        );
        console.log(findIndexParent, "findIndexParent");

        if (findIndexParent != -1) {
          let findIndexStory = this.stories[findIndexParent].items.findIndex(
            (item) => item.id == option.id,
          );
          console.log(findIndexStory, "findIndexStory");
          if (findIndexStory != -1) {
            this.stories[findIndexParent].items[findIndexStory].like =
              likeCount;
          }
        }
        console.log(this.stories, "this.stories");
      }
    },
    setReadStories(index) {
      let findIndex = this.readStories.findIndex((item) => item == index);

      if (findIndex == -1) {
        this.readStories.push(index);
      }
    },
    // setPrevStepStories(story) {
    //   this.prevStepStories = story;
    // },
  },
});
