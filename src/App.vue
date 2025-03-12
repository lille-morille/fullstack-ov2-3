<script setup lang="ts">
import { Button } from "./components/ui/button";
</script>

<template>
  <nav class="flex flex-row gap-4 w-full justify-center my-4">
    <Button variant="outline">
      <RouterLink to="/login">Logg inn</RouterLink>
    </Button>
    <Button variant="outline">
      <RouterLink to="/">Kalkulator</RouterLink>
    </Button>
    <Button variant="outline">
      <RouterLink to="/history">Historikk</RouterLink>
    </Button>
    <Button variant="outline">
      <RouterLink to="/contact">Kontaktskjema</RouterLink>
    </Button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
