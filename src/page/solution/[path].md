---
editLink:
    pattern: 'https://github.com/inf-lab-dev/solution/edit/main/:path'
    stripPathPrefix: '/solution'
---

<script setup>
import SolutionRepositoryPage from '@/components/solution/SolutionRepositoryPage.vue'
</script>

<SolutionRepositoryPage :requestedPage="$params.path" />
