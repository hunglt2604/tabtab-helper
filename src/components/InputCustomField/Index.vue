<script setup>
  import Number from "./NumberInput.vue";
  import Text from "./TextInput.vue";
  import {computed} from "vue";

  const props = defineProps({
    type: {
      default: 'number',
      type: String
    }
  })
  const component =  computed(() => {
    switch (props.type) {
      case 'text':
        return Text;
      default:
        return Number

    }
  })

</script>

<template>
  <component :is="component"></component>
</template>


<style scoped>

</style>
