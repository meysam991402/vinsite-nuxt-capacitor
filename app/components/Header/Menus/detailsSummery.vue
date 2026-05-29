<template>
  <ul class="p-3 *:text-gray-600" v-if="list && list.length">
    <li class="p-1" v-for="(item, index) in list" :key="item?.id ?? index">
      <template v-if="item?.children?.length">
        <details class="group/item" name="list">
          <summary class="flex items-center justify-between">
            <!-- <NuxtLink @click="emit('close')" :to="`/${item?.slug ?? ''}`">{{
              item?.title ?? ""
            }}</NuxtLink> -->
            <ShareDynamicLinker :item="item?.link">
              {{ item?.title ?? "" }}
            </ShareDynamicLinker>
            <span class="flex">
              <IconsArrow class="w-4 h-4 group-open/item:-rotate-90 transition-all duration-300" />
            </span>
          </summary>
          <ul class="p-3">
            <li class="p-1" v-for="(subItem, index) in item?.children" :key="subItem?.id ?? index">
              <template v-if="subItem?.children?.length">
                <details class="group/subCategory" name="subCategory">
                  <summary class="flex items-center justify-between">
                    <!-- <NuxtLink
                      @click="emit('close')"
                      :to="`/${subItem?.slug ?? ''}`"
                      >{{ subItem?.title ?? "" }}</NuxtLink
                    > -->
                    <ShareDynamicLinker :item="subItem?.link">
                      {{ subItem?.title ?? "" }}
                    </ShareDynamicLinker>
                    <span class="flex group-open/subCategory:-rotate-90 transition-all duration-300">
                      <IconsArrow class="w-4 h-4" />
                    </span>
                  </summary>
                  <ul class="p-3">
                    <li class="p-1" v-for="(subItem2, index) in subItem?.children" :key="subItem2?.id ?? index">
                      <template v-if="subItem2?.children?.length">
                        <details class="group/subCategory2" name="subCategory2">
                          <summary class="flex items-center justify-between">
                            <!-- <NuxtLink
                              @click="emit('close')"
                              :to="`/${subItem2?.slug ?? ''}`"
                              >{{ subItem2?.title ?? "" }}</NuxtLink
                            > -->
                            <ShareDynamicLinker :item="subItem2?.link">
                              {{ subItem2?.title ?? "" }}
                            </ShareDynamicLinker>
                            <span class="flex group-open/subCategory2:-rotate-90 transition-all duration-300">
                              <IconsArrow class="w-4 h-4" />
                            </span>
                          </summary>
                        </details>
                      </template>
                      <template v-else>
                        <!-- <NuxtLink
                          @click="emit('close')"
                          :to="`/${subItem2?.slug ?? ''}`"
                          >{{ subItem2?.title ?? "" }}</NuxtLink
                        > -->
                        <ShareDynamicLinker :item="subItem2?.link">
                          {{ subItem2?.title ?? "" }}
                        </ShareDynamicLinker>
                      </template>
                    </li>
                  </ul>
                </details>
              </template>
              <template v-else>
                <!-- <NuxtLink
                  @click="emit('close')"
                  :to="`/${subItem?.slug ?? ''}`"
                  >{{ subItem?.title ?? "" }}</NuxtLink
                > -->
                <ShareDynamicLinker :item="subItem?.link">
                  {{ subItem?.title ?? "" }}
                </ShareDynamicLinker>
              </template>
            </li>
          </ul>
        </details>
      </template>
      <template v-else>
        <!-- <NuxtLink @click="emit('close')" :to="`/${item?.slug ?? ''}`">{{
          item?.title ?? ""
        }}</NuxtLink> -->
        <ShareDynamicLinker :item="item?.link">
          {{ item?.title ?? "" }}
        </ShareDynamicLinker>
      </template>
    </li>
  </ul>
</template>
<script setup>
const emit = defineEmits("close");
defineProps({
  list: Array,
});

</script>
