<script setup>
/**
 * Dynamic Pages, see `[path].paths.ts` for further explanation.
 */
import SolutionRepositoryPage from '@/components/solution/SolutionRepositoryPage.vue';
import NotFound from '@/../.vitepress/theme/components/NotFound.vue';
</script>

<SolutionRepositoryPage v-if="$params.type === 'solution-repository'" :requestedPage="$params.path" />

<NotFound v-else />
