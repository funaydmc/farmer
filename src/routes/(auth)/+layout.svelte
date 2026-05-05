<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<div class="auth-layout">
  <div class="auth-container">
    <div class="brand">
      <img src="/logo.png" alt="Farmer Logo" width="48" height="48" style="border-radius: 6px;" />
      <h1>Farmer Platform</h1>
    </div>
    {@render children()}
  </div>
</div>

<style>
  .auth-layout {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface-base);
    padding: var(--space-4);
  }

  .auth-container {
    width: 100%;
    max-width: 400px;
    background-color: var(--color-surface-raised);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-md);
    padding: var(--space-7);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-7);
  }

  .brand h1 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }
</style>
