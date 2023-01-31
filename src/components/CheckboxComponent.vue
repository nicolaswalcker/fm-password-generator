<template>
  <li class="option">
    <input
      type="checkbox"
      :name="value"
      :id="value"
      class="option__checkbox"
      v-model="model"
      :value="value"
    />

    <label :for="value" class="option__label">
      <span class="option__input">
        <CheckIcon class="option__input__icon" /> </span
      >{{ label }}</label
    >
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import CheckIcon from './icons/CheckIcon.vue'

  const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: String },
    label: { type: String },
  })

  const emit = defineEmits(['update:modelValue'])

  const model = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>

<style scoped lang="scss">
  .option {
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: flex-start;
    list-style: none;

    &__label {
      display: flex;
      gap: 24px;
      align-items: center;
      justify-content: flex-start;
      color: $almost-white;
      text-transform: capitalize;
      @include body;
    }

    &__input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid $neon-green;
      transition: all ease 0.2s;

      &__icon {
        transition: all ease 0.2s;
        transform: scale(0);
      }
    }

    &__checkbox {
      display: none;
    }

    &__checkbox:checked + &__label > &__input {
      background: $neon-green;
    }

    &__checkbox:checked + &__label &__input {
      &__icon {
        transform: scale(1);
      }
    }
  }
</style>
