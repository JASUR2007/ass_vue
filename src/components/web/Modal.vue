<template>
  <CModal
    :visible="visible"
    alignment="center"
    scrollable
    @close="$emit('close')"
  >
    <CModalHeader v-if="$slots.header || title">
      <CModalTitle v-if="title">{{ title }}</CModalTitle>
      <slot name="header" />
    </CModalHeader>

    <CModalBody>
      <slot />
    </CModalBody>

    <CModalFooter v-if="$slots.footer">
      <slot name="footer" />
    </CModalFooter>
  </CModal>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})
defineEmits(['close'])
</script>
