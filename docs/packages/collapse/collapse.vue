<template>
  <open-collapse
      v-model="activeNames"
      @change="handleChange"
  >
    <open-collapse-item title="Consistency" name="1">
      <div>
        Consistent with real life: in line with the process and logic of real
        life, and comply with languages and habits that the users are used to;
      </div>
    </open-collapse-item>
    <open-collapse-item title="Feedback" name="2">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
    </open-collapse-item>
    
  </open-collapse>
</template>

<script setup lang="ts">
import OpenCollapse from "@/components/collapse";
import {CollapseItem as OpenCollapseItem} from "@/components/collapse";
import {ref} from "vue";

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}

</script>
