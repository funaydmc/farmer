<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();
  let isLoading = $state(false);
</script>

<div class="login-page">
  <div class="header">
    <h2>Welcome back</h2>
    <p>Sign in to manage your automation profiles.</p>
  </div>

  {#if form?.error}
    <div class="error-box" role="alert">
      {form.error}
    </div>
  {/if}

  <form 
    method="POST" 
    use:enhance={() => {
      isLoading = true;
      return async ({ update }) => {
        isLoading = false;
        await update();
      };
    }}
  >
    <div class="field-group">
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        required
        autocomplete="username"
        placeholder="Enter your username"
        disabled={isLoading}
      />
    </div>

    <div class="field-group">
      <div class="label-row">
        <label for="password">Password</label>
        <a href="#forgot" class="link-muted">Forgot password?</a>
      </div>
      <input
        id="password"
        name="password"
        type="password"
        required
        autocomplete="current-password"
        placeholder="••••••••"
        disabled={isLoading}
      />
    </div>

    <div class="field-row">
      <label class="checkbox-label">
        <input type="checkbox" name="remember" />
        <span>Remember me</span>
      </label>
    </div>

    <button type="submit" class="btn-primary" disabled={isLoading}>
      {#if isLoading}
        Signing in...
      {:else}
        Sign in
      {/if}
    </button>
  </form>

  <div class="footer">
    <p>Don't have an account? <a href="/register" class="link-primary">Register here</a></p>
  </div>
</div>

<style>
  .login-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .header {
    text-align: center;
    margin-bottom: var(--space-2);
  }

  .header h2 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-xl);
    color: var(--color-text-primary);
  }

  .header p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .error-box {
    background-color: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.4);
    color: #ef4444;
    padding: var(--space-4);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary); /* Brighter for readability */
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: var(--space-4);
    background-color: var(--color-surface-base);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    transition: border-color var(--motion-duration-fast), box-shadow var(--motion-duration-fast);
  }

  input::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.5;
  }

  input:focus-visible {
    outline: none;
    border-color: var(--color-surface-muted);
    box-shadow: 0 0 0 1px var(--color-surface-muted);
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .field-row {
    display: flex;
    align-items: center;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    cursor: pointer;
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-base);
  }

  .checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: var(--color-surface-muted);
    cursor: pointer;
  }

  .btn-primary {
    width: 100%;
    padding: var(--space-4);
    background-color: var(--color-surface-muted);
    color: var(--color-text-primary);
    border: none;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: background-color var(--motion-duration-fast), transform var(--motion-duration-fast);
    margin-top: var(--space-2);
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #d85c3b; /* Slightly darker shade of muted */
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(1px);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .footer {
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-top: var(--space-2);
  }

  .footer p {
    margin: 0;
  }

  .link-primary {
    color: var(--color-surface-muted);
    font-weight: var(--font-weight-medium);
    text-decoration: none;
  }

  .link-primary:hover {
    text-decoration: underline;
  }

  .link-muted {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color var(--motion-duration-fast);
  }

  .link-muted:hover {
    color: var(--color-text-primary);
  }
</style>
