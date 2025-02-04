<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import * as z from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { computed, ref } from "vue";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: "Navn må fylles ut" }),
    email: z
      .string()
      .min(1, { message: "Epost må fylles ut" })
      .email({ message: "Må være en gyldig epost" }),
    message: z.string().min(1, { message: "Melding må fylles ut" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const status = ref("");

const isValid = computed(
  () =>
    form.isFieldValid("email") &&
    form.isFieldValid("name") &&
    form.isFieldValid("message")
);

const onSubmit = form.handleSubmit(async (values) => {
  const response = await fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    status.value = response.status.toString();
  }
});
</script>

<template>
  <main class="flex flex-col items-center justify-center h-[70svh]">
    <h1 class="font-bold text-xl">Kontaktskjema</h1>

    <div id="status">Status: {{ status }}</div>

    <form class="flex flex-col gap-3 w-full max-w-sm" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem v-auto-animate>
          <FormLabel>Navn</FormLabel>
          <FormControl>
            <Input placeholder="Ola Nordmann" v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem v-auto-animate>
          <FormLabel>Epost addresse</FormLabel>
          <FormControl>
            <Input placeholder="ola.nordmann@mail.no" v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="message">
        <FormItem v-auto-animate>
          <FormLabel>Melding</FormLabel>
          <FormControl>
            <Input placeholder="Min melding ..." v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" :disabled="!isValid">Send</Button>
    </form>
  </main>
</template>
