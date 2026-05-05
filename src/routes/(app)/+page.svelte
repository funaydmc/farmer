<script lang="ts">
  // Dashboard Overview
  let stats = [
    { label: "Active Profiles", value: 12 },
    { label: "Tasks Running", value: 4 },
    { label: "Success Rate", value: "98%" }
  ];
</script>

<div class="dashboard">
  <div class="welcome">
    <h1>Welcome to Farmer</h1>
    <p class="subtitle">Automation Platform Dashboard</p>
  </div>

  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <div class="stat-value">{stat.value}</div>
        <div class="stat-label">{stat.label}</div>
      </div>
    {/each}
  </div>

  <div class="recent-activity">
    <h2>Recent Activity</h2>
    <div class="card empty-state">
      <p>No recent activity detected. Start a profile to begin.</p>
    </div>
  </div>
</div>

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
  }

  .welcome h1 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
  }

  .subtitle {
    margin: 0;
    color: var(--color-text-secondary);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-6);
  }

  .stat-card {
    background-color: var(--color-surface-raised);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-sm);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    transition: transform var(--motion-duration-fast);
  }

  .stat-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-surface-muted);
  }

  .stat-value {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .recent-activity h2 {
    font-size: var(--font-size-lg);
    margin: 0 0 var(--space-4) 0;
  }

  .card {
    background-color: var(--color-surface-raised);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-md);
    padding: var(--space-6);
  }

  .empty-state {
    color: var(--color-text-secondary);
    text-align: center;
    padding: var(--space-7);
  }
</style>
