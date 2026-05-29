<template>
  <header class="w-full pt-3 pb-3 lg:pb-0  bg-white border-b border-b-solid border-b-gray-300">
    <section class="container">
      <div class="flex items-center justify-between">
        <HeaderBtnResMenu />

        <div class="flex items-center gap-8">
          <Logo class="w-36 md:w-48" />
          <HeaderSearchBox />
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <HeaderBtnLogin />
          <HeaderBtnBuy />
        </div>
      </div>
      <HeaderMenus class="mt-5 hidden lg:block" />
    </section>
  </header>
</template>
