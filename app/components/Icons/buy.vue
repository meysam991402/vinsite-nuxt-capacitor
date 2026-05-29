<template>
  <svg
    v-if="quantity == 0"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <!-- Icon from Majesticons by Gerrit Halfmann - https://github.com/halfmage/majesticons/blob/main/LICENSE -->
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path d="M3 3h2l.5 3m0 0L7 15h11l3-9z" />
      <circle cx="8" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </g>
  </svg>
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <!-- Icon from Majesticons by Gerrit Halfmann - https://github.com/halfmage/majesticons/blob/main/LICENSE -->
    <g fill="none">
      <path fill="currentColor" d="M18 15H7L5.5 6H21z" />
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.5 3m0 0L7 15h11l3-9z"
      />
      <circle
        cx="8"
        cy="20"
        r="1"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <circle
        cx="17"
        cy="20"
        r="1"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </g>
    <text
      x="13"
      y="13"
      font-size="10"
      text-anchor="middle"
      fill="white"
      font-weight="bold"
    >
      {{ quantity }}
    </text>
  </svg>
</template>
<script setup>
defineProps({
  quantity: {
    type: Number,
    default: 0,
  },
});
</script>
