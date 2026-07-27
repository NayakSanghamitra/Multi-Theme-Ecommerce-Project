import { Chart as ChartJS, registerables } from 'chart.js'

export default defineNuxtPlugin(() => {
  // Registers all scales, controllers, elements, and plugins at once
  ChartJS.register(...registerables)
})
