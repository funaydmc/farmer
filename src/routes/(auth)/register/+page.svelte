<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();
  let isLoading = $state(false);
  let googleLoading = $state(false);

  async function signInWithGoogle() {
    googleLoading = true;
    try {
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = '/register?error=google_failed';
      }
    } catch {
      window.location.href = '/register?error=google_failed';
    }
  }
</script>

<div class="login-page">
  <div class="header">
    <h2>Create an account</h2>
    <p>Sign up to start automating.</p>
  </div>

  {#if form?.error}
    <div class="error-box" role="alert">
      {form.error}
    </div>
  {/if}

  <button class="btn-google" onclick={signInWithGoogle} disabled={googleLoading || isLoading}>
    {#if googleLoading}
      <span class="spinner"></span>
      Connecting...
    {:else}
      <svg class="google-icon" viewBox="0 0 24 24" width="20" height="20">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Sign in with Google
    {/if}
  </button>

  <div class="divider">
    <span>or</span>
  </div>

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
        disabled={isLoading || googleLoading}
      />
    </div>

    <div class="field-group">
      <div class="label-row">
        <label for="password">Password</label>
        
      </div>
      <input
        id="password"
        name="password"
        type="password"
        required
        autocomplete="current-password"
        placeholder="••••••••"
        disabled={isLoading || googleLoading}
      />
    </div>

    <div class="field-row">
      <label class="checkbox-label">
        <input type="checkbox" name="remember" />
        <span>Remember me</span>
      </label>
    </div>

    <button type="submit" class="btn-primary" disabled={isLoading || googleLoading}>
      {#if isLoading}
        Creating account...
      {:else}
        Create Account
      {/if}
    </button>
  </form>

  <div class="footer">
    <p>Already have an account? <a href="/login" class="link-primary">Sign in here</a></p>
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

  .btn-google {
    width: 100%;
    padding: var(--space-4);
    background-color: #fff;
    color: #444;
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: background-color var(--motion-duration-fast), transform var(--motion-duration-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
  }

  .btn-google:hover:not(:disabled) {
    background-color: #f7f7f7;
    border-color: #c6c6c6;
  }

  .btn-google:active:not(:disabled) {
    transform: translateY(1px);
  }

  .btn-google:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .google-icon {
    flex-shrink: 0;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #444;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .divider {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--color-border-strong);
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
    color: var(--color-text-primary);
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
    background-color: #d85c3b;
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
</style>
