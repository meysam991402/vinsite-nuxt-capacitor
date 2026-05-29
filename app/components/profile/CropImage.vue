<template>
  <div class="modal_cropper" @click.self="emit('close')" :id="id">
    <div class="modal_content" id="headerCropper">
      <div
        class="modal-header flex items-center border-b border-b-solid border-b-gray-400 pb-3 justify-between w-full"
      >
        <h6 class="modal-title grow text-center font-bold">
          تغییر عکس پروفایل
        </h6>
        <button type="button" class="close flex" @click="emit('close')">
          <IconsDeleted width="30" height="30" />
        </button>
      </div>
      <div class="modal-body text-center px-4">
        <div class="cropper-container">
          <ClientOnly>
            <vue-cropper
              ref="cropper"
              :aspectRatio="1"
              :src="imgSrc"
              :data="{ width: 400, height: 400 }"
              width="400"
              height="400"
              :autoCropArea="1"
              :min-crop-box-width="120"
              :min-crop-box-height="120"
              :min-container-height="300"
              :min-container-width="300"
            />
          </ClientOnly>
        </div>
      </div>
      <div class="modal-footer flex items-center justify-center gap-4">
        <button
          :disabled="disabled"
          type="button"
          class="bg-gray-200 text-sm px-6 py-2 rounded-md"
          @click="emit('close')"
        >
          بستن
        </button>
        <button
          :disabled="disabled"
          type="button"
          @click="submit"
          class="bg-black text-sm rounded-md text-white px-6 py-2"
          id="chooseBtn"
        >
          انتخاب
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

// تعریف props
const props = defineProps({
  image: {
    type: [String, Boolean],
    required: true,
  },
  id: {
    type: String,
    default: "crop-profile",
  },
});
const emit = defineEmits(["close", "cropped-image"]);
const imgSrc = ref(null);
const disabled = ref(false);
const cropper = ref(null); // برای دسترسی به cropper

// Watcher برای نظارت بر تغییرات image
watch(
  () => props.image,
  (newImage) => {
    imgSrc.value = newImage;
    if (cropper.value) {
      cropper.value.replace(newImage);
    }
  },
  { immediate: true },
);

function submit() {
  if (!cropper.value) {
    return;
  }

  const cropped = cropper.value.getCroppedCanvas().toDataURL();
  disabled.value = true;
  emit("close");
  emit("cropped-image", cropped);
}
</script>
<style scoped>
.modal_content {
  background-color: #fff;
  width: 500px !important;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 16px;
}

.modal_cropper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #0000004f;
  z-index: 10000;
  display: grid;
  place-items: center;
}

@media screen and (max-width: 768px) {
  .modal_content {
    width: 90% !important;
  }
}
</style>
<style>
.crop-image-modal .cropper-container {
  width: 400px !important;
  height: 300px !important;
  position: relative;
  margin: auto;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .crop-image-modal .cropper-container {
    width: 90% !important;
    height: 300px !important;
  }
}
</style>
