<template>
  <ClientOnly>
    <div>
      <label for="chooseImage" id="selectProfileImage">
        <figure
          class="image_box"
          :class="{
            'border-[2px] border-solid border-[#add8e6]': srcImage != '',
          }"
        >
          <NuxtImg
            v-if="srcImage != ''"
            format="wepb"
            loading="lazy"
            decoding="async"
            :src="srcImage"
            alt="عکس پروفایل"
          />
          <div class="edit_profile_image">
            <span class="icon_profile_image flex">
              <IconsEditSquare color="#f97316" />
            </span>
          </div>
        </figure>
      </label>
      <input
        hidden
        id="chooseImage"
        type="file"
        ref="chooseImage"
        accept="image/*"
        :value="imageValue"
        :disabled="loading"
        @input="changeProfileImage"
      />
      <Teleport to="body">
        <Transition name="fade">
          <ProfileCropImage
            @CroppedImage="CroppedImage"
            :image="img"
            v-if="showCropper"
            @close="closeCropper"
          />
        </Transition>
      </Teleport>
    </div>
  </ClientOnly>
</template>
<script setup>
const store = useUserStore();
const srcImage = computed(() => store.getProfileImage);
const loading = computed(() => store.getLoadingImage);

let showBox = ref(false);
let img = ref(null);
let showCropper = ref(false);
let imageValue = ref(null);

function changeProfileImage(event) {
  var files = event.target.files || event.dataTransfer.files;
  if (!files.length) {
    return;
  } else {
    var reader = new FileReader();
    reader.onload = (e) => {
      showBox.value = true;
      img.value = e.target.result;
    };

    reader.readAsDataURL(files[0]);
    showCropper.value = true;
  }
}
function closeCropper() {
  showCropper.value = false;
  imageValue.value = null;
}
function CroppedImage(e) {
  store.setProfileImage(e);
  store.requestProfileImage(e);
}
</script>
<style scoped>
.image_box {
  width: 70px;
  height: 70px;
  position: relative;
  background-color: #4b5563;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.edit_profile_image {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6705882352941176);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

.image_box:hover .edit_profile_image {
  visibility: visible;
  opacity: 1;
}
</style>
