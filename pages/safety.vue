<script setup lang="ts">
const items = [
  {
    title: 'Personal Safety and Security',
    icon: 'ph:question-duotone',
    content: `What is Personal Security?

Personal Security involves taking steps to keep yourself safe, and protecting yourself from situations that are potentially violent or criminal. Personal Security is important because property can be replaced but YOU ARE IRREPLACEABLE.

Personal Security involves:

Recognizing, anticipating, and assessing the risk of a crime occurring.
Being aware of your surroundings at all times, and not placing yourself in situations which might jeopardize your safety.
Remember, suspects can be very unpredictable and may have weapons.
When in doubt, CALL POLICE FOR ASSISTANCE
`,
  },
  {
    title: 'Personal Safety and Security',
    content: `What is Personal Security?

Personal Security involves taking steps to keep yourself safe, and protecting yourself from situations that are potentially violent or criminal. Personal Security is important because property can be replaced but YOU ARE IRREPLACEABLE.

Personal Security involves:

Recognizing, anticipating, and assessing the risk of a crime occurring.
Being aware of your surroundings at all times, and not placing yourself in situations which might jeopardize your safety.
Remember, suspects can be very unpredictable and may have weapons.
When in doubt, CALL POLICE FOR ASSISTANCE
`,
  },
  {
    title: 'Personal Safety and Security',
    content: `What is Personal Security?

Personal Security involves taking steps to keep yourself safe, and protecting yourself from situations that are potentially violent or criminal. Personal Security is important because property can be replaced but YOU ARE IRREPLACEABLE.

Personal Security involves:

Recognizing, anticipating, and assessing the risk of a crime occurring.
Being aware of your surroundings at all times, and not placing yourself in situations which might jeopardize your safety.
Remember, suspects can be very unpredictable and may have weapons.
When in doubt, CALL POLICE FOR ASSISTANCE
`,
  },
]

const selected = ref<number | undefined>()
</script>

<template>
  <div>
    <template v-for="item, index of items" :key="index">
      <h2 id="accordion-open-heading-1">
        <button type="button"
          class="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200/0 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900/50 gap-3"
          :class="[
            items.length - 1 === index ? 'border-b' : 'border-b-0',
            { 'rounded-t-xl': index === 0 },
            { 'rounded-b-xl': items.length - 1 === index && selected !== index },
          ]"
          data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1"
          @click="selected = index"
        >
          <span class="flex items-center gap-2">
            <Icon class="w-5 h-5" :name="item?.icon ?? 'ph:question-duotone'" />
            {{ item.title }}
          </span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5 5 1 1 5" />
          </svg>
        </button>
      </h2>
      <div id="accordion-open-body-1" :class="selected === index ? '' : 'hidden'" aria-labelledby="accordion-open-heading-1">
        <div
          class="dark:text-white p-5 border border-gray-200 dark:border-gray-700 dark:bg-neutral-900"
          :class="[
            items.length - 1 === index && selected === index ? 'border-b border-t-0 rounded-b-xl' : 'border-b-0',
          ]"
        >
          <div v-html="item.content" />
        </div>
      </div>
    </template>
  </div>
</template>