<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="calculation in calculations"
      :key="calculation.expression"
      class="flex justify-between gap-x-6 py-5"
    >
      <div class="flex w-full gap-x-4">
        <div class="flex-auto px-8">
          <p class="text-xl font-semibold text-gray-900">
            {{ calculation.expression }}
          </p>
          <p class="mt-1 truncate text-lg text-gray-500">
            {{ calculation.result }}
          </p>
        </div>
      </div>
    </li>
  </ul>
  <div v-if="hasMore" class="mt-8 ml-8">
    <Button @click="fetchNext()">Hent flere</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "./components/ui/button";
import { onMounted, ref } from "vue";
import { getCalculationHistory, type Calculation } from "./lib/api";
import router from "./router";

const loading = ref(true);
const page = ref(0);
const calculations = ref<Calculation[]>([]);
const hasMore = ref(false);

async function fetchNext() {
  loading.value = true;
  page.value += 1;

  const newCalculations = await fetchCalculations(page.value);
  if (!newCalculations) return;

  calculations.value = [...calculations.value, ...newCalculations.calculations];
  loading.value = false;
}

async function fetchCalculations(page: number) {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    router.push("/login");
    return;
  }
  const calculations = await getCalculationHistory({ jwt, page, size: 5 });
  hasMore.value = !calculations.isLast;
  return calculations;
}

onMounted(async () => {
  console.log("Fetching history ...");

  const history = await fetchCalculations(page.value);
  calculations.value = history?.calculations ?? [];
});
</script>
