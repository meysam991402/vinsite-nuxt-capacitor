import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.use( Vue3PersianDatetimePicker , {
        name:'date-picker',
        props:{
            format: 'YYYY-MM-DD HH:mm',
            displayFormat: 'jYYYY-jMM-jDD',
            placeholder: 'تاریخ تولد',
            inputClass: 'date-picker placeholder:!text-right  placeholder:!text-sm',
        }
    });
});