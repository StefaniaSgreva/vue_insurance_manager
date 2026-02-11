<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Total Clients</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalClients }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13.67 3.645a10.02 10.02 0 01-.671 5.001"
              />
            </svg>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            ↑ {{ stats.clientGrowth }}%
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Active Policies</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.activePolicies }}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            ↑ {{ stats.policiesGrowth }}%
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Premium Volume</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">
              ${{ formatNumber(stats.premiumVolume) }}
            </p>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            ↑ {{ stats.premiumGrowth }}%
          </span>
          <span class="text-xs text-gray-500 ml-2">vs last month</span>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 font-medium">Renewals Due</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.renewalsDue }}</p>
          </div>
          <div class="p-3 bg-yellow-100 rounded-lg">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="flex items-center mt-4">
          <span class="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
            {{ stats.expiringThisWeek }} expiring this week
          </span>
        </div>
      </div>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Premium Distribution Chart (placeholder) -->
      <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-900">Premium Distribution</h2>
          <select
            v-model="chartPeriod"
            class="text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <p class="text-gray-500">
            Chart component would go here (e.g., using Chart.js or ApexCharts)
          </p>
          <!-- In a real app, integrate a chart library -->
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-900">Recent Activity</h2>
          <router-link
            to="/activity"
            class="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </router-link>
        </div>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start space-x-3"
          >
            <div :class="`p-2 rounded-lg ${activity.iconBg}`">
              <svg
                class="w-4 h-4"
                :class="activity.iconColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  :d="activity.iconPath"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-500">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Renewals Table -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-gray-900">Upcoming Renewals</h2>
        <router-link
          to="/policies/renewals"
          class="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Manage Renewals
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Policy
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expiry Date
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Premium
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="renewal in upcomingRenewals" :key="renewal.id" class="hover:bg-gray-50">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-blue-600 font-semibold text-xs">{{
                        renewal.clientInitials
                      }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ renewal.clientName }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {{ renewal.policyNumber }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {{ formatDate(renewal.expiryDate) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                ${{ renewal.premium }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span
                  :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRenewalStatusClass(renewal.status)}`"
                >
                  {{ renewal.status }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm">
                <button
                  @click="renewPolicy(renewal.id)"
                  class="text-primary-600 hover:text-primary-900 font-medium"
                >
                  Renew
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// -------------------- Types --------------------
interface DashboardStats {
  totalClients: number
  clientGrowth: number
  activePolicies: number
  policiesGrowth: number
  premiumVolume: number
  premiumGrowth: number
  renewalsDue: number
  expiringThisWeek: number
}

interface Activity {
  id: number
  title: string
  description: string
  time: string
  iconBg: string
  iconColor: string
  iconPath: string
}

interface Renewal {
  id: number
  clientName: string
  clientInitials: string
  policyNumber: string
  expiryDate: string
  premium: number
  status: 'Active' | 'Expiring' | 'Expired' | 'Renewed'
}

// -------------------- Mock Data --------------------
const stats = ref<DashboardStats>({
  totalClients: 142,
  clientGrowth: 12,
  activePolicies: 89,
  policiesGrowth: 8,
  premiumVolume: 245000,
  premiumGrowth: 15,
  renewalsDue: 7,
  expiringThisWeek: 3,
})

const chartPeriod = ref('month')

const recentActivities = ref<Activity[]>([
  {
    id: 1,
    title: 'New client added',
    description: 'John Smith - Auto Insurance',
    time: '2 hours ago',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath:
      'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  },
  {
    id: 2,
    title: 'Policy renewed',
    description: 'Sarah Johnson - Home Insurance',
    time: 'Yesterday',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    id: 3,
    title: 'Claim filed',
    description: 'Robert Brown - Auto Insurance (CLM-2024-012)',
    time: 'Yesterday',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    iconPath:
      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  {
    id: 4,
    title: 'Payment received',
    description: 'Emily Davis - Life Insurance - $1,200.00',
    time: '3 days ago',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconPath:
      'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  },
])

const upcomingRenewals = ref<Renewal[]>([
  {
    id: 1,
    clientName: 'Michael Chen',
    clientInitials: 'MC',
    policyNumber: 'POL-2024-001',
    expiryDate: '2024-02-28',
    premium: 850,
    status: 'Expiring',
  },
  {
    id: 2,
    clientName: 'Lisa Wong',
    clientInitials: 'LW',
    policyNumber: 'POL-2023-456',
    expiryDate: '2024-03-05',
    premium: 1200,
    status: 'Expiring',
  },
  {
    id: 3,
    clientName: 'James Miller',
    clientInitials: 'JM',
    policyNumber: 'POL-2023-789',
    expiryDate: '2024-03-12',
    premium: 2100,
    status: 'Active',
  },
  {
    id: 4,
    clientName: 'Patricia Taylor',
    clientInitials: 'PT',
    policyNumber: 'POL-2024-032',
    expiryDate: '2024-03-20',
    premium: 675,
    status: 'Active',
  },
])

// -------------------- Helper Functions --------------------
const formatNumber = (value: number): string => {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M'
  if (value >= 1000) return (value / 1000).toFixed(1) + 'K'
  return value.toString()
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

const getRenewalStatusClass = (status: string): string => {
  switch (status) {
    case 'Expiring':
      return 'bg-yellow-100 text-yellow-800'
    case 'Expired':
      return 'bg-red-100 text-red-800'
    case 'Renewed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// -------------------- Actions --------------------
const renewPolicy = (id: number) => {
  // Navigate to renewal page or open modal
  console.log(`Renew policy ${id}`)
  // In a real app: router.push(`/policies/renew/${id}`)
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
