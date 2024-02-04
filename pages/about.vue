<script setup lang="ts">
import { version } from '~/package.json'
</script>

<template>
  <main class="dark:text-white">
    <h2 class="text-3xl text-primary">
      Overview
    </h2>
    <div class="flex flex-col gap-8 my-4 pl-4">
      <p>
        The Rural Crime Watch program, as we know it, began in 1978 supported by four local Associations: The Alberta Cattle Commission, the Western Stock Growers’ Association, the Farmers Advocate, and the RCMP. The program was initially called the Range Patrol, and were established to provide additional “eyes and ears” for the RCMP, whereby these groups organized vehicle patrols in an effort to identify and record suspicious vehicle and human activity in rural. Over time, however, Range Patrol drew a negative image in the Media so the program was renamed “Alberta Rural Crime Watch”. Local Associations developed throughout the Province, during these early years; some of which still carrying the Range Patrol reference in their names.
      </p>
      <p>
        Prior to 1993, Rural Crime Watch Associations were not linked by a provincial body; in 1993 it was decided a province wide umbrella group was needed to support and enhance crime prevention so a committee was formed to produce bylaws and policies. On March 19, 1995, the Alberta Provincial Rural Crime Watch Association (APRCWA) received official recognition as a Society and the APRCWA Organization has become a supportive Organization for Member Associations.
      </p>
      <p>
        The focus of the Rural Crime Watch program still provides the extra “eyes and ears” for the RCMP, however the focus has changed. The focus is now promoting Crime Prevention through awareness, education and encouraging reporting of suspicious activity when observed.
      </p>
      <p>
        The scope of the Alberta Rural Crime Watch Association has expanded. Member Associations are now concentrating their efforts on farmstead, acreage and rural property security, property identification and general rural crime awareness. Patrol activities are not as frequent, and the "Report A Poacher" program has been included in the Rural Crime Watch Association's activities.
      </p>
      <p>
        The Rural Crime Watch Program was designed to reduce the incidence of crime in all rural areas and to create a more thorough understanding and awareness of the laws. It is completely voluntary involving all rural residents working in cooperation with their local RCMP detachments.
      </p>
    </div>
    <h2 class="text-3xl text-primary">
      Mission Statement
    </h2>
    <p class="mt-4 mb-8 pl-4">
      Alberta Provincial Rural Crime Watch Association will strive to promote rural crime prevention through communication, programs and support.
    </p>
    <div class="p-4 mb-4 text-sm text-primary rounded-lg bg-green-50 dark:bg-neutral-900 font-bold" role="alert">
      v{{ version }}
    </div>
  </main>
</template>
