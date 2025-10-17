// /middleware/admin.ts
export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth();
  if (status.value !== "authenticated") {
    return navigateTo(`/login?next=${encodeURIComponent(to.fullPath)}`);
  }
  const role = data.value?.user?.role;
  if (role !== "admin") {
    // bloqueia quem não é admin
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
});
