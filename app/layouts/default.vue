<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
    <!-- Modern Header Navigation -->
    <header class="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center space-x-3">
          <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span class="mdi mdi-cube-outline text-xl text-white"></span>
          </div>
          <div>
            <h1 class="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              StockTrack Platform
            </h1>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center space-x-2 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
          <NuxtLink
            to="/"
            exact-active-class="bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-300 hover:text-white flex items-center space-x-2"
          >
            <span class="mdi mdi-view-dashboard-outline text-base"></span>
            <span>Dashboard</span>
          </NuxtLink>

          <NuxtLink
            to="/inventory"
            exact-active-class="bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
            class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-300 hover:text-white flex items-center space-x-2"
          >
            <span class="mdi mdi-package-variant-closed text-base"></span>
            <span>Inventory</span>
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>
