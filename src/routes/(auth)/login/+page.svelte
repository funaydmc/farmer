<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form } = $props();
</script>

<div class="auth-container">
  <div class="auth-card">
    <h1>Login</h1>
    <form method="POST" use:enhance>
      <div class="field">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minlength="3"
          required
          autocomplete="username"
        />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minlength="6"
          required
          autocomplete="current-password"
        />
      </div>
      {#if form?.error}
        <p class="error">{form.error}</p>
      {/if}
      <button type="submit">Login</button>
    </form>
    <p class="switch">
      Don't have an account? <a href="/register">Register</a>
    </p>
  </div>
</div>

<style>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: var(--color-bg, #0f1117);
  }
  .auth-card {
    background: var(--color-surface, #1a1d27);
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    color: var(--color-text, #e1e4eb);
  }
  h1 {
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
  }
  .field {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #8b8fa3);
  }
  input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border, #2a2d3a);
    border-radius: 4px;
    background: var(--color-input-bg, #12141c);
    color: var(--color-text, #e1e4eb);
    font-size: 0.95rem;
  }
  input:focus-visible {
    outline: 2px solid var(--color-primary, #6c63ff);
    outline-offset: 1px;
  }
  button {
    width: 100%;
    padding: 0.6rem;
    border: none;
    border-radius: 4px;
    background: var(--color-primary, #6c63ff);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }
  .error {
    color: var(--color-error, #ef4444);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  .switch {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #8b8fa3);
  }
  a {
    color: var(--color-primary, #6c63ff);
    text-decoration: none;
  }
</style>
