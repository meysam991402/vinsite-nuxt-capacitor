<template>
    <!-- Teleport باعث می‌شود مودال از بیرونِ جای اصلی‌اش رندر شود (داخل body) -->
    <Teleport to="body">
        <!-- اگر modelValue=false باشد، کل مودال نمایش داده نمی‌شود -->
        <div v-if="modelValue" class="fixed inset-0 z-50 bg-black/50 flex items-end  md:justify-center"
            @click.self="close">
            <!-- خودِ باکس مودال -->
            <div ref="modalRef" class="relative w-full bg-white rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden"
                :class="[
                    isDesktop ? 'md:max-w-2xl md:w-full' : 'w-full'
                ]" :style="modalStyle">
                <!-- Handle: نوار کشیدن برای تغییر ارتفاع مودال -->
                <!-- cursor-ns-resize یعنی حس کشیدن بالا/پایین -->
                <!-- touch-none و user-select جلوگیری می‌کند از رفتارهای ناخواسته موبایل/موس -->
                <div class="w-full flex justify-center items-center py-3 cursor-ns-resize select-none touch-none"
                    @pointerdown="startResize">
                    <!-- خودِ دکمه/نوار کوچک وسط برای نشان دادن قابل‌کشیدن بودن -->
                    <div class="w-16 h-1.5 rounded-full bg-gray-300"></div>
                </div>

                <!-- قسمت محتوای اصلی مودال -->
                <!-- overflow-y-auto یعنی اگر محتوا زیاد بود، اسکرول بار عمودی اضافه شود -->
                <div class="overflow-y-auto px-4 pb-4" :style="contentStyle">
                    <!-- محتوای مودال از بیرون به این کامپوننت پاس داده می‌شود -->
                    <slot>
                        محتوای پیش‌فرض مودال
                    </slot>
                </div>

                <!-- دکمه بستن مودال -->
                <button class="absolute top-3 right-3 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg"
                    @click="close">
                    بستن
                </button>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Props: مقادیری که از کامپوننت والد دریافت می‌شود
const props = defineProps({
    // modelValue برای v-model استفاده می‌شود؛ اگر true باشد مودال باز است
    modelValue: {
        type: Boolean,
        required: true
    }
})

// Emits: رویدادهایی که این کامپوننت به والد می‌فرستد
const emit = defineEmits(['update:modelValue'])

// refs: متغیرهایی که به المان‌های DOM یا وضعیت‌های پویا ارجاع می‌دهند
const modalRef = ref(null) // ارجاع به المان اصلی مودال برای دسترسی به ابعاد و موقعیت

// State: وضعیت‌های مربوط به تغییر اندازه مودال
const height = ref(40) // ارتفاع فعلی مودال بر حسبvh (۴۰ درصد ارتفاع صفحه)
const minHeight = 40 // حداقل ارتفاع مجاز مودال (بر حسب vh)
const maxHeight = 100 // حداکثر ارتفاع مجاز مودال (بر حسب vh)

const isResizing = ref(false) // آیا در حال حاضر مودال در حال تغییر اندازه است؟
const startY = ref(0) // مختصات y ماوس/تاچ در ابتدای شروع تغییر اندازه
const startHeight = ref(40) // ارتفاع مودال در ابتدای شروع تغییر اندازه

const isDesktop = ref(false) // آیا دستگاه کاربر دسکتاپ است یا موبایل؟

// تابع برای تشخیص نوع دستگاه (دسکتاپ/موبایل) بر اساس عرض صفحه
const checkDesktop = () => {
    // اگر عرض صفحه 768 پیکسل یا بیشتر بود، دسکتاپ محسوب می‌شود
    isDesktop.value = window.innerWidth >= 768
}

// Computed Properties: مقادیر محاسبه شده که بر اساس وضعیت تغییر می‌کنند

// استایل‌های مربوط به خودِ باکس مودال (height و maxHeight)
const modalStyle = computed(() => {
    return {
        height: `${height.value}vh`, // تنظیم ارتفاع مودال بر اساس مقدار height
        maxHeight: '100vh' // حداکثر ارتفاع مودال همیشه ۱۰۰ درصد صفحه است
    }
})

// استایل‌های مربوط به قسمت محتوای داخلی مودال
const contentStyle = computed(() => {
    // محاسبه ارتفاع محتوا: ۱۰۰% ارتفاع مودال منهای ارتفاع قسمت header (شامل handle و کمی padding)
    // این مقدار (52px) باید اگر اندازه header تغییر کرد، به‌روز شود.
    const headerHeight = 52;
    return {
        height: `calc(100% - ${headerHeight}px)`
    }
})

// تابع برای بستن مودال
const close = () => {
    // ارسال رویداد update:modelValue با مقدار false به والد برای بستن مودال (برای v-model)
    emit('update:modelValue', false)
}

// تابع شروع فرآیند تغییر اندازه مودال (با کلیک روی Handle)
const startResize = (e) => {
    isResizing.value = true // فعال کردن حالت تغییر اندازه
    startY.value = e.clientY // ذخیره مختصات عمودی اولیه ماوس/تاچ
    startHeight.value = height.value // ذخیره ارتفاع فعلی مودال

    // جلوگیری از رفتارهای پیش‌فرض مرورگر (مثل select شدن متن یا drag شدن عکس)
    e.preventDefault()

    // اضافه کردن event listener ها برای رصد حرکت ماوس/تاچ و رها کردن آن
    // استفاده از pointermove و pointerup برای پشتیبانی همزمان ماوس و تاچ
    window.addEventListener('pointermove', onResize)
    window.addEventListener('pointerup', stopResize)
}

// تابع در حین حرکت ماوس/تاچ برای تغییر اندازه مودال
const onResize = (e) => {
    // اگر در حال تغییر اندازه نباشیم، کاری انجام نده
    if (!isResizing.value) return

    // محاسبه میزان جابجایی عمودی ماوس/تاچ نسبت به نقطه شروع
    const deltaY = startY.value - e.clientY
    // تبدیل جابجایی به درصد ارتفاع صفحه
    const deltaPercent = (deltaY / window.innerHeight) * 100

    // محاسبه ارتفاع جدید مودال
    let newHeight = startHeight.value + deltaPercent

    // اعمال محدودیت‌های حداقل و حداکثر ارتفاع
    if (newHeight < minHeight) newHeight = minHeight
    if (newHeight > maxHeight) newHeight = maxHeight

    // به‌روزرسانی مقدار height
    height.value = newHeight
}

// تابع پایان فرآیند تغییر اندازه (با رها کردن ماوس/تاچ)
const stopResize = () => {
    isResizing.value = false // غیرفعال کردن حالت تغییر اندازه
    // حذف event listener ها برای جلوگیری از محاسبه‌های اضافی
    window.removeEventListener('pointermove', onResize)
    window.removeEventListener('pointerup', stopResize)
}

// Hooks: توابع lifecycle Vue

// onMounted: بعد از اینکه کامپوننت به DOM اضافه شد اجرا می‌شود
onMounted(() => {
    checkDesktop() // بررسی اولیه نوع دستگاه
    // اضافه کردن listener برای رویداد resize صفحه (مثلاً اگر کاربر پنجره مرورگر را تغییر اندازه دهد)
    window.addEventListener('resize', checkDesktop)
})

// onBeforeUnmount: قبل از اینکه کامپوننت از DOM حذف شود اجرا می‌شود
onBeforeUnmount(() => {
    // حذف event listener ها برای جلوگیری از memory leaks
    window.removeEventListener('resize', checkDesktop)
    window.removeEventListener('pointermove', onResize)
    window.removeEventListener('pointerup', stopResize)
})
</script>

<style scoped>
/* استایل‌های اختصاصی این کامپوننت */
/* برای اطمینان از اینکه تغییر اندازه به درستی کار می‌کند، */
/* ممکن است نیاز به تنظیمات بیشتری در CSS باشد، اما برای مثال فعلی کافی است. */
</style>
