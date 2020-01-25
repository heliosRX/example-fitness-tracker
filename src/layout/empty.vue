<template>
  <div class="default">
    <header class="Header">
       <section class="row">
        <div class="column column-0" style="flex: 0 0 40px; padding: 0">
          <img src="@/assets/logo.svg" height="32px" />
        </div>
        <div class="column column-0">
          <div class="Logo Logo--full" aria-label="Challenge App">
            <router-link class="Link" to="/">
              Challenge App
            </router-link>
          </div>
        </div>
        <div class="column"></div>
      </section>
    </header>

    <div class="Main-Empty">
      <main class="Content-Empty">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>

<style>
.Main-Empty {
	padding-top: 10rem;
	height: calc(100vh - 50px);
	margin: 2rem;
}
</style>
