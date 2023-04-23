<template>
  <article class="generator">
    <header class="generator__header">
      <h1
        class="generator__header__password"
        :class="{ 'is-empty': finalPassword.length <= 0 }"
      >
        {{ finalPassword || 'P4$5W0rD!' }}
      </h1>
      <p class="generator__header__copy">
        <Transition>
          <span v-if="copied" class="generator__header__copy__confirm"
            >copied</span
          >
        </Transition>
        <button
          @click="copy(finalPassword)"
          class="generator__header__copy__button"
        >
          <CopyIcon class="generator__header__copy__button__icon" />
        </button>
      </p>
    </header>
    <main class="generator__main">
      <div class="generator__main__length">
        <p class="generator__main__length__text">
          <span class="generator__main__length__text__label"
            >Character length</span
          >
          <span class="generator__main__length__text__count">{{
            characterLength
          }}</span>
        </p>
        <input
          type="range"
          v-model="characterLength"
          step="1"
          name="#"
          ref="mySlider"
          :max="characterMax"
          class="generator__main__length__range"
          :style="{
            background: `linear-gradient(to right, #a4ffaf ${percent}%, #18171f ${percent}%)`,
          }"
        />
      </div>
      <ul class="generator__main__options">
        <CheckboxComponent
          v-for="(option, i) in optionsArray"
          :key="i"
          :value="option.value"
          :label="option.label"
          v-model="userOptions"
        />
      </ul>
      <div class="generator__main__strength">
        <p class="generator__main__strength__label">strength</p>
        <article class="generator__main__strength__meter">
          <p class="generator__main__strength__meter__label">
            {{ classifyPassword(finalPassword)?.text }}
          </p>
          <p class="generator__main__strength__meter__counter">
            <span
              v-for="bar in 4"
              :key="bar"
              class="generator__main__strength__meter__counter__item active"
              :class="classifyPassword(finalPassword)?.class"
            ></span>
          </p>
        </article>
      </div>
      <button
        @click="makePassword(userOptions, characterLength)"
        class="generator__main__button"
      >
        Generate <ArrowIcon />
      </button>
    </main>
  </article>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import CopyIcon from './icons/CopyIcon.vue'
  import ArrowIcon from './icons/ArrowIcon.vue'
  import CheckboxComponent from './CheckboxComponent.vue'

  interface OptionItem {
    value: string
    label: string
  }

  const characterLength = ref<number>(0)
  const characterMax = ref<number>(20)
  const finalPassword = ref<string>('')
  const { copy, copied } = useClipboard()
  const userOptions = ref<string[]>([])
  const optionsArray = ref<OptionItem[]>([
    {
      value: 'uppercase',
      label: 'Include Uppercase Letters',
    },
    {
      value: 'lowercase',
      label: 'Include Lowercase Letters',
    },
    {
      value: 'numbers',
      label: 'Include Numbers',
    },
    {
      value: 'symbols',
      label: 'Include Symbols',
    },
  ])

  const makePassword = (options: string[], length: number) => {
    let charSets: any = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()?',
    }
    let charSet = ''
    if (options.includes('uppercase')) {
      charSet += charSets.uppercase
    }
    if (options.includes('lowercase')) {
      charSet += charSets.lowercase
    }
    if (options.includes('numbers')) {
      charSet += charSets.numbers
    }
    if (options.includes('symbols')) {
      charSet += charSets.symbols
    }
    if (charSet.length === 0 || length <= 0) return 'Invalid options or length'
    let password = ''
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(
        (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
          charSet.length
      )
      password += charSet[randomIndex]
    }
    finalPassword.value = password
  }

  const percent = computed<number>(() => {
    return (characterLength.value / characterMax.value) * 100
  })

  const classifyPassword = (password: string) => {
    if (password.length < 8) return { text: 'To Weak!', class: 'to-weak' }
    let score = 0
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[!@#$%^&*()?]/.test(password) && password.length >= 15) score++
    switch (score) {
      case 1:
        return { text: 'To Weak!', class: 'to-weak' }
      case 2:
        return { text: 'Weak', class: 'weak' }
      case 3:
        return { text: 'Medium', class: 'medium' }
      case 4:
        return { text: 'Strong', class: 'strong' }
    }
  }
</script>

<style lang="scss" scoped>
  .generator {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 33.75rem;
    max-width: 90%;

    &__header,
    &__main {
      width: 100%;
      background-color: $grey-200;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-height: 80px;
      padding: 1.25rem clamp(1rem, 2.5vw, 2rem);

      &__password {
        color: $almost-white;
        background: none;
        border: none;
        @include heading-m;

        &.is-empty {
          opacity: 0.5;
        }
      }

      &__copy {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: flex-end;
        width: 100px;

        &__button {
          cursor: pointer;
          background: none;
          border: none;

          &:hover &__icon:deep path {
            fill: $white;
            transition: all ease 0.3s;
          }
        }

        &__confirm {
          color: $neon-green;
          text-transform: uppercase;
          @include body;
        }
      }
    }

    &__main {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
      padding: 1.5rem clamp(1rem, 2.5vw, 2rem) 2rem;

      &__length {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        justify-content: center;
        width: 100%;

        &__text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          &__label {
            @include body;

            color: $almost-white;
          }

          &__count {
            @include heading-l;

            color: $neon-green;
          }
        }

        &__range {
          position: relative;
          display: block;
          width: 100%;
          appearance: none;
          height: 8px;
          background-color: $grey-300;
          outline: none;

          &::-webkit-slider-runnable-track {
            appearance: none;
            height: 8px;
          }

          &::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
            margin-top: -10px;
            cursor: pointer;
            background-color: $almost-white;
            border-radius: 50%;
            appearance: none;
            transition: all ease 0.2s;
          }

          &:active::-webkit-slider-thumb {
            background-color: $grey-300;
            border: 2px solid $neon-green;
          }
        }
      }

      &__options {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        justify-content: flex-start;
      }

      &__strength {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 72px;
        padding: 0 2rem;
        background-color: $grey-300;

        &__label {
          color: $grey-100;
          text-transform: uppercase;
          @include body;
        }

        &__meter {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: flex-end;
          height: 100%;

          &__label {
            color: $almost-white;
            text-transform: uppercase;
            @include heading-m;
          }

          &__counter {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: center;
            height: 100%;

            &__item {
              width: 0.625rem;
              height: 1.75rem;

              &.active {
                border: 2px solid $almost-white;
              }

              &.active:nth-child(-1n + 1).to-weak {
                background-color: $red;
                border: none;
              }

              &.active:nth-child(-1n + 2).weak {
                background-color: $orange;
                border: none;
              }

              &.active:nth-child(-1n + 3).medium {
                background-color: $yellow;
                border: none;
              }

              &.active.strong {
                background-color: $neon-green;
                border: none;
              }
            }
          }
        }
      }

      &__button {
        width: 100%;
        height: 65px;
        color: $grey-200;
        text-transform: uppercase;
        cursor: pointer;
        background-color: $neon-green;
        border: 2px solid $neon-green;
        transition: all ease 0.2s;

        @include body;

        &:hover {
          color: $neon-green;
          background: transparent;
          fill: $neon-green;
        }
      }
    }
  }
</style>
