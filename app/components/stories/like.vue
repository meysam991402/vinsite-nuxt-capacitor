<template>
  <div class="relative">
    <button
      @click="addLike"
      :disabled="disabled"
      class="flex gap-2 items-center relative z-10"
    >
      <span class="text-white">{{ likeCount }}</span>
      <IconsLike
        class="text-white *:stroke-white"
        :class="{ 'fill-red-500 *:first:stroke-red-500!': like }"
      />
    </button>

    <!-- لایه افکت قلب‌ها -->
    <div class="absolute inset-0 overflow-visible pointer-events-none">
      <transition-group name="heart" tag="div">
        <div
          v-for="heart in hearts"
          :key="heart.id"
          class="absolute text-2xl select-none heart-item"
          :style="{
            left: heart.left + '%',
            bottom: '8px',
            color: heart.color,
            '--offset-x': heart.offsetX + 'px',
            '--offset-y': heart.offsetY + 'px',
            '--rot': heart.rotate + 'deg',
            '--duration': heart.duration + 's',
            animationDelay: heart.delay + 's',
          }"
        >
          ❤️
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let store = useStoriesStore();
let base = useRuntimeConfig();
// let stories = computed(()=>store.getStories);
let props = defineProps({
  option: Object,
  parentId: Number,
});
let cookie = useCookie("likes");
const like = ref(false);
let disabled = ref(false);
let likeCount = ref(props?.option?.like || 0);
let id = ref(props?.option?.id || null);
const hearts = ref([]);
onMounted(() => {
  if (cookie.value) {
    let findIndex = cookie.value.findIndex((item) => item.id == id.value);
    if (findIndex != -1) {
      like.value = cookie.value[findIndex].like;
      //   if (likeCount.value >= 0) {
      //     if (like.value) {
      //       likeCount.value += 1;
      //     } else {
      //       likeCount.value -= 1;
      //     }
      //   }
      //   likeCount.value = cookie.value[findIndex].likeCount;
    } else {
      like.value = false;
    }
  }
  //    else {
  //     cookie.value = [];
  //   }
});
console.log(cookie.value, "like.value)");
const addLike = async () => {
  let url = `${base.public.apiBaseUrl}/front/story-items/${id.value}/${like.value == true ? "dislike" : "like"}`;
  like.value = !like.value;
  //   likeCount.value += like.value ? likeCount.value : likeCount.value--;
  //   if (likeCount.value >= 0) {
  //     if (like.value) {
  //       likeCount.value += 1;
  //     } else if (likeCount.value > 0) {
  //       likeCount.value -= 1;
  //     }
  //   }
  //   if (cookie.value) {
  //     let findIndex = cookie.value.findIndex((item) => item.id == id.value);
  //     let item = { id: id.value, like: like.value, likeCount: likeCount.value };
  //     if (findIndex != -1) {
  //       cookie.value[findIndex].like = like.value;
  //     } else {
  //       cookie.value.push(item);
  //     }
  //   }
  console.log(cookie.value, "cookie.value");

  if (like.value) {
    const numHearts = 12; // تعداد قلب‌ها در هر کلیک

    for (let i = 0; i < numHearts; i++) {
      const id = Date.now() + i;

      // جهت تصادفی: -1 (چپ) یا 1 (راست)
      const direction = Math.random() > 0.5 ? 1 : -1;

      // جابجایی افقی نهایی (px)
      const offsetX = (Math.random() * 80 + 40) * direction; // 40 تا 120px به چپ یا راست

      // ارتفاع نهایی (px)
      const offsetY = -(Math.random() * 160 + 120); // بین 120 تا 280 px به بالا

      // مدت زمان انیمیشن (ثانیه)
      const duration = Math.random() * 0.8 + 1.8; // حدود 1.8 تا 2.6 ثانیه

      hearts.value.push({
        id,
        left: Math.random() * 80 + 10, // درصد روی محور X
        delay: Math.random() * 0.4, // تاخیر در شروع
        color: randomColor(),
        rotate: Math.random() * 40 - 20, // چرخش
        offsetX,
        offsetY,
        duration,
      });

      // پاکسازی بعد از پایان انیمیشن
      setTimeout(
        () => {
          hearts.value = hearts.value.filter((h) => h.id !== id);
        },
        (duration + 0.5) * 1000,
      ); // کمی بیشتر از duration
    }
  }
  console.log(like.value, "like.value)");

  try {
    disabled.value = true;
    const data = await $fetch(url, {
      method: "PUT",
    });
    console.log(data, "datadatadatadata");
    //   likeCount.value = cookie.value[findIndex].likeCount;
    likeCount.value = data.data.like;
    store.changeLikeCount(props.option, props.parentId, data.data.like);
    if (cookie.value) {
      let findIndex = cookie.value.findIndex((item) => item.id == id.value);
      let item = { id: id.value, like: like.value };
      //   let item = { id: id.value, like: like.value, likeCount: data.data.like };
      if (findIndex != -1) {
        cookie.value[findIndex].like = like.value;
      } else {
        cookie.value.push(item);
      }
    }
  } catch (error) {
    console.error("❌ خطا در گرفتن داده از /api/home", error);
  } finally {
    disabled.value = false;
  }
};

const randomColor = () => {
  const colors = [
    "#ff3366",
    "#ff4da6",
    "#ff6699",
    "#ff99cc",
    "#ff1a75",
    "#ff80b3",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>
<style scoped>
/* انیمیشن مسیر منحنی */
@keyframes heart-curve {
  0% {
    transform: translate(0, 0) scale(1) rotate(var(--rot));
    opacity: 0;
    filter: blur(1px);
  }

  10% {
    opacity: 1;
  }

  40% {
    transform: translate(
        calc(var(--offset-x) * 0.5),
        calc(var(--offset-y) * 0.4)
      )
      scale(1.1) rotate(var(--rot));
    opacity: 0.95;
    filter: blur(0);
  }

  70% {
    transform: translate(
        calc(var(--offset-x) * 0.8),
        calc(var(--offset-y) * 0.8)
      )
      scale(1.3) rotate(var(--rot));
    opacity: 0.8;
  }

  100% {
    transform: translate(var(--offset-x), var(--offset-y)) scale(1.5)
      rotate(var(--rot));
    opacity: 0;
    filter: blur(2px);
  }
}

/* هر قلب از این کلاس استفاده می‌کنه */
.heart-item {
  animation-name: heart-curve;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-duration: var(--duration, 2s);
}

/* برای transition-group لازم داریم، حتی اگه ازش خیلی استفاده نکنیم */
.heart-enter-active,
.heart-leave-active {
  transition: opacity 0.2s;
}

.heart-enter-from,
.heart-leave-to {
  opacity: 0;
}
</style>
