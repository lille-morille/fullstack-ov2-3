<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { ref } from "vue";
import calculate from "./calculate";

const text = ref("");

interface History {
  text: string;
  result: number;
}

const history = ref<History[]>([]);

function performCalculation(): void {
  const mem = text.value;
  const output = calculate(text.value);
  if (output.isValid) {
    history.value.push({ result: parseInt(output), text: mem });
  }

  text.value = output.value;
}

function inputText(char: string): void {
  if (char === "=") {
    performCalculation();
    return;
  } else if (char === "C") {
    text.value = "";
    return;
  } else if (char === "ANS") {
    text.value += history.value[history.value.length - 1].result;
    return;
  } else if (char === "DEL") {
    text.value = text.value.slice(0, -1);
    return;
  }

  text.value += char;
}
</script>

<template>
  <main
    class="flex flex-col gap-2 w-full h-[100svh] justify-center items-center"
  >
    <div class="font-bold text-xl">Enkel kalkulator med historikk</div>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="max-w-sm flex flex-col gap-2">
        <div
          id="#text"
          class="w-full bg-slate-300 h-12 rounded-md flex items-center justify-start px-4 font-medium text-lg"
        >
          {{ text }}
        </div>
        <div id="#input flex flex-col">
          <div class="flex flex-row gap-2">
            <Button class="w-12" @click="inputText('C')">C</Button>
            <Button class="w-12" @click="inputText('ANS')">ANS</Button>
            <Button class="w-12" @click="inputText('DEL')">DEL</Button>
            <Button class="w-12" @click="inputText('+')">+</Button>
          </div>
          <div class="flex flex-row gap-2 mt-1">
            <Button class="w-12" @click="inputText('1')">1</Button>
            <Button class="w-12" @click="inputText('2')">2</Button>
            <Button class="w-12" @click="inputText('3')">3</Button>
            <Button class="w-12" @click="inputText('-')">-</Button>
          </div>
          <div class="flex flex-row gap-2 mt-1">
            <Button class="w-12" @click="inputText('4')">4</Button>
            <Button class="w-12" @click="inputText('5')">5</Button>
            <Button class="w-12" @click="inputText('6')">6</Button>
            <Button class="w-12" @click="inputText('*')">*</Button>
          </div>
          <div class="flex flex-row gap-2 mt-1">
            <Button class="w-12" @click="inputText('7')">7</Button>
            <Button class="w-12" @click="inputText('8')">8</Button>
            <Button class="w-12" @click="inputText('9')">9</Button>
            <Button class="w-12" @click="inputText('/')">/</Button>
          </div>
          <div class="flex flex-row gap-2 mt-1">
            <Button disabled class="w-12"></Button>
            <Button class="w-12" @click="inputText('0')">0</Button>
            <Button class="w-12" @click="inputText('.')">.</Button>
            <Button class="w-12" @click="inputText('=')">=</Button>
          </div>
        </div>
      </div>
      <div class="w-full max-w-sm">
        <div class="flex flex-col gap-2 w-full items-center">
          <div
            v-for="item in history"
            :key="item.text"
            class="px-4 py-2 bg-slate-100 w-full rounded-md flex justify-center"
          >
            <div>{{ item.text }} = {{ item.result }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
