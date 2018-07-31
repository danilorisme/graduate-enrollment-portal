<template>
    <button :class="buttonStyle" :type="type" @click="buttonAction()">{{ label }}</button>
</template>

<script>
export default {
   props: {
       
            type: {
                required: true,
                type: String
            },

            label: {
                required: true,
                type: String
            },

            confirmation: {
                required: false,
                default: false,
                type: Boolean
            },

            classStyle: {
                required: false,
                default: 'primary',
                type: String
            }
        },
   methods: {

        buttonAction() {
            if(this.confirmation) {
                if(confirm('Do you really want to delete this Enrollment?')) {
                    this.$emit('buttonClick')
                }
                return
            }
        this.$emit('buttonClick')
       }
   },
   computed: {

       buttonStyle() {
           if(this.classStyle == 'primary') return 'btn btn-primary'
           if(this.classStyle == 'danger') return 'btn btn-danger'
           if(this.classStyle == 'success') return 'btn btn-success'
       }
   }
}
</script>    

<style scoped>

</style>