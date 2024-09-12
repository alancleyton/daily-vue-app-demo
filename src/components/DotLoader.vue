<template>
  <div
    id="dotLoader"
    class="flex justify-center items-center h-14"
    role="alert"
    aria-busy
  >
    <div class="flex flex-row gap-2">
      <div class="animate-bounce">
        <div class="w-5 h-5 rounded-full bg-gray-50 animate-pulse" />
      </div>

      <div class="animate-bounce [animation-delay:-.3s]">
        <div
          class="w-5 h-5 rounded-full bg-gray-50 animate-pulse [animation-delay:-.3s]"
        />
      </div>

      <div class="animate-bounce [animation-delay:-.3s]">
        <div
          class="w-5 h-5 rounded-full bg-gray-50 animate-pulse [animation-delay:-.3s]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DotLoader',
};
</script>
