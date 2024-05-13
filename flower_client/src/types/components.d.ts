import cpNavbar from '@/components/cp-navbar.vue'
// import cpNavBar from '@/components/cp-navbar.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavbar: typeof cpNavbar
  }
}
