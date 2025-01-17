<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  headers: { key: string; label: string }[]
  data: Record<string, string>[]
  actions?: {
    label: string
  }[]
}>()

const emit = defineEmits<{
  (e: 'action', item: Record<string, string>): void
}>()
</script>

<template>
  <div class="table-wrapper">
    <table class="base-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key">
            {{ header.label }}
          </th>
           <th v-if="actions?.length">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="header in headers" :key="header.key">
            {{ row[header.key] }}
          </td>
          <td v-if="actions?.length" class="actions">
            <button
              v-for="action in actions"
              :key="action.label"
              class="action-btn"
              @click="emit('action', row)"
            >
              {{ action.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.base-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}

.base-table th,
.base-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.base-table th {
  background-color: #f8fafc;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  color: #475569;
}

.base-table td {
  font-size: 0.95rem;
  color: #1e293b;
}

.base-table tbody tr:last-child td {
  border-bottom: none;
}

.base-table tbody tr:hover {
  background-color: #f1f5f9;
  transition: all 0.2s ease;
}

.action-btn {
  padding: 0.3rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn i {
  font-size: 1rem;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
}

.action-btn.danger {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: white;
}

.action-btn.warning {
  background: linear-gradient(135deg, #d97706, #f59e0b);
  color: white;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  opacity: 0.95;
}

.action-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .base-table th,
  .base-table td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
