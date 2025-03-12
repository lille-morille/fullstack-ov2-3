<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
        v-if="isLoggingIn"
      >
        Logg inn
      </h1>
      <h1
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
        v-else
      >
        Registrer deg
      </h1>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem v-auto-animate>
            <FormLabel>Brukernavn</FormLabel>
            <FormControl>
              <Input placeholder="" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel>Passord</FormLabel>
            <FormControl>
              <Input placeholder="" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <div>
          <Button
            type="submit"
            class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span v-if="isLoggingIn"> Logg inn </span>
            <span v-if="!isLoggingIn"> Registrer </span>
          </Button>
        </div>
      </form>
      <div
        v-if="isLoggingIn"
        class="flex flex-row justify-between w-full items-center mt-2"
      >
        <span class="text-sm">Har du ikke en bruker?</span>
        <Button variant="link" @click="isLoggingIn = !isLoggingIn"
          >Registrer deg istedet</Button
        >
      </div>
      <div
        v-else
        class="flex flex-row justify-between w-full items-center mt-2"
      >
        <span class="text-sm">Har du allerede en bruker?</span>
        <Button variant="link" @click="isLoggingIn = !isLoggingIn"
          >Logg inn istedet</Button
        >
      </div>
    </div>
  </div>
</template>

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
import { ref } from "vue";
import { login, register } from "./lib/api";
import router from "./router";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(1, { message: "Brukernavn må fylles ut" }),
    password: z.string().min(1, { message: "Passord må fylles ut" }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const status = ref("");
const isLoggingIn = ref(true);

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const token = await (isLoggingIn.value ? login(values) : register(values));
    localStorage.setItem("jwt", token);
    router.push("/");
  } catch (error) {
    if (isLoggingIn.value) {
      status.value = "Feil brukernavn eller passord";
    } else {
      status.value = "Epost er allerede i bruk";
    }
  }
});
</script>
