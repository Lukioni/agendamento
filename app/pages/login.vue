<script setup lang="ts">
const route = useRoute();
const { signIn } = useAuth();

const email = ref("");
const password = ref("");
const nextPath = computed(() => String(route.query.next ?? "/"));

const error = ref<string | null>(null);
const loading = ref(false);

async function doLogin() {
  loading.value = true;
  error.value = null;
  const res = await signIn("credentials", {
    email: email.value,
    password: password.value,
    redirect: false, // evita full redirect, a gente navega manual
    callbackUrl: nextPath.value, // respeita o ?next=
  });
  loading.value = false;

  if (res?.ok) {
    await navigateTo(nextPath.value);
  } else {
    error.value = "Email ou senha inválidos";
  }
}
</script>

<template>
  <div class="mx-auto max-w-sm p-6 space-y-4">
    <h1 class="text-2xl font-semibold">Entrar</h1>

    <form @submit.prevent="doLogin" class="space-y-3">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full border rounded p-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-full border rounded p-2"
      />
      <button :disabled="loading" class="w-full rounded p-2 border">
        {{ loading ? "Entrando…" : "Entrar" }}
      </button>
    </form>

    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>
