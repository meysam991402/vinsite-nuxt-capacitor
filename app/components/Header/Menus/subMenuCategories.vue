<template>
  <nav
    v-if="categories && categories.length"
    class="absolute top-[60px] opacity-0 invisible group-hover:opacity-100 group-hover:top-full group-hover:visible transition-all duration-500 right-0 shadow-xl bg-gray-50 w-[800px] xl:w-[900px] flex rounded-2xl overflow-hidden"
  >
    <ul class="w-[200px] bg-gray-200">
      <li
        @mouseenter="setChild(category, index)"
        v-for="(category, index) in categories"
        :key="category?.id ?? index"
        class="py-4.5 px-3 text-gray-800 text-sm"
        :class="{ 'bg-gray-50 text-black!': index == activeItem }"
      >
        <NuxtLink
          :to="`/${category?.slug ?? ''}`"
          :class="{ 'text-black': index == activeItem }"
          class="flex items-center *:line-clamp-1 w-full gap-1.5 text-gray-500 text-sm font-bold"
        >
          <span class="flex">
            <IconsTestLaptop />
          </span>
          <span>
            {{ category?.title ?? "" }}
          </span>
        </NuxtLink>
      </li>
    </ul>
    <div class="grow p-8 max-h-[350px] overflow-auto">
      <NuxtLink
        to="/"
        class="flex items-center font-bold text-sm mb-6 text-red-500"
      >
        <span>
          {{ `همه محصولات ${childTitle ?? ""}` }}
        </span>
        <span class="flex">
          <IconsArrow class="w-3 h-3" />
        </span>
      </NuxtLink>
      <ul class="grid grid-cols-3 gap-2">
        <li
          v-for="(child, index) in childCategory.length ? childCategory : []"
          :key="child?.id ?? index"
          class="w-full hover:text-red-500"
        >
          <NuxtLink
            :to="`/${child?.slug ?? ''}`"
            class="font-bold flex items-center"
          >
            <span>
              {{ child?.title ?? "" }}
            </span>
            <span
              class="flex"
              v-if="child && child.children && child.children.length"
            >
              <IconsArrow class="w-3 h-3" />
            </span>
          </NuxtLink>
          <ul
            v-if="child && child.children && child.children.length"
            class="pr-1.5 pt-1.5"
          >
            <li
              v-for="(subchild, index) in child.children"
              class="p-1.5 text-sm text-gray-600 hover:text-black"
              :key="subchild?.id ?? index"
            >
              <NuxtLink :to="`/${subchild?.slug ?? ''}`" class="text-sm">
                {{ subchild?.title ?? "" }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
let props = defineProps({
  categories: Array,
});
let childCategory = ref(
  props.categories.length && props.categories[0].children.length
    ? props.categories[0].children
    : [],
);
let childTitle = ref(props.categories.length ? props.categories[0].title : "");
let activeItem = ref(0);
function setChild(category, index) {
  activeItem.value = index;
  childTitle.value = category?.title ?? "";
  childCategory.value = category?.children?.length ? category?.children : [];
}
</script>
