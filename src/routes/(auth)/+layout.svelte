<script lang="ts">
  import '../../app.css';
  let { children } = $props();
</script>

<div class="auth-layout">
  <div class="auth-wrapper">
    <div class="brand">
      <img src="/logo.png" alt="Farmer Logo" width="64" height="64" style="border-radius: var(--radius-sm);" />
      <h1>Farmer Platform</h1>
    </div>
    <div class="auth-card-wrapper">
      {@render children()}
    </div>
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

  .auth-wrapper {
    width: 100%;
    max-width: 440px; /* Wider and more comfortable on desktop */
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .auth-card-wrapper {
    background-color: var(--color-surface-raised);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-md);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    padding: var(--space-7);
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    /* Removes the huge gap from previous layout */
  }

  .brand h1 {
    margin: 0;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }
</style>
