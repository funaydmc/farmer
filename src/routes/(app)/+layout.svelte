<script lang="ts">
  import '../../app.css';
  let { children, data } = $props();

  let sidebarOpen = $state(false);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="layout-root">
  <!-- Mobile Header / Hamburger -->
  <header class="mobile-header">
    <button class="menu-btn" onclick={toggleSidebar} aria-label="Toggle Navigation">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    </button>
    <div class="logo-mobile">Farmer Platform</div>
  </header>

  <!-- Sidebar -->
  <aside class="sidebar {sidebarOpen ? 'open' : ''}" aria-hidden={!sidebarOpen}>
    <div class="brand">
      <div class="logo">
        <img src="/logo.png" alt="Farmer Logo" width="32" height="32" style="border-radius: 4px;" />
      </div>
      <h2>Farmer</h2>
    </div>

    <nav class="nav-links">
      <a href="/" onclick={() => sidebarOpen = false}>Dashboard</a>
      <a href="/profiles" onclick={() => sidebarOpen = false}>Profiles</a>
      <a href="/settings" onclick={() => sidebarOpen = false}>Settings</a>
    </nav>
  </aside>

  <!-- Overlay for mobile sidebar -->
  {#if sidebarOpen}
    <div class="sidebar-overlay" onclick={toggleSidebar} aria-label="Close sidebar" role="button" tabindex="0" onkeypress={(e) => e.key === 'Enter' && toggleSidebar()}></div>
  {/if}

  <!-- Main Content -->
  <main class="content">
    <header class="desktop-header">
      <div class="page-title">Dashboard</div>
      <div class="user-profile">
        {#if data.user}
          {data.user.username}
        {:else}
          Guest
        {/if}
      </div>
    </header>
    <div class="page-container">
      {@render children()}
    </div>
  </main>
</div>

<style>
  .layout-root {
    display: flex;
    min-height: 100vh;
    background-color: var(--color-surface-base);
  }

  /* Mobile Header */
  .mobile-header {
    display: none;
    align-items: center;
    padding: var(--space-4) var(--space-6);
    background-color: var(--color-surface-raised);
    border-bottom: 1px solid var(--color-border-strong);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    height: 60px;
  }

  .menu-btn {
    background: none;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    padding: var(--space-2);
  }

  .logo-mobile {
    margin-left: var(--space-4);
    font-weight: var(--font-weight-semibold);
  }

  /* Sidebar */
  .sidebar {
    width: 250px;
    background-color: var(--color-surface-raised);
    border-right: 1px solid var(--color-border-strong);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 50;
    transition: transform var(--motion-duration-normal) ease;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6);
    border-bottom: 1px solid var(--color-border-strong);
  }

  .brand h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    padding: var(--space-4) 0;
    flex: 1;
  }

  .nav-links a {
    padding: var(--space-4) var(--space-6);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    transition: background-color var(--motion-duration-fast) ease, color var(--motion-duration-fast) ease;
  }

  .nav-links a:hover, .nav-links a:focus-visible {
    background-color: var(--color-surface-strong);
    color: var(--color-text-primary);
  }

  /* Main Content */
  .content {
    flex: 1;
    margin-left: 250px;
    display: flex;
    flex-direction: column;
  }

  .desktop-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-7);
    border-bottom: 1px solid var(--color-border-strong);
    background-color: var(--color-surface-base);
  }

  .page-container {
    padding: var(--space-7);
    flex: 1;
    overflow-y: auto;
  }

  .sidebar-overlay {
    display: none;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .content {
      margin-left: 0;
      margin-top: 60px;
    }
    
    .mobile-header {
      display: flex;
    }
    
    .desktop-header {
      display: none;
    }

    .sidebar-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 45;
    }
  }
</style>
