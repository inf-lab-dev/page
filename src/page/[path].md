<script setup>
/**
 * Dynamic Pages, see `[path].paths.ts` for further explanation.
 */
import SolutionRepositoryPage from '@/components/solution/SolutionRepositoryPage.vue';
import PublishedSolutionPage from '@/components/solution/publish/PublishedSolutionPage.vue';
</script>

<SolutionRepositoryPage v-if="$params.type === 'solution-repository'" :requestedPage="$params.path" />
<PublishedSolutionPage v-else-if="$params.type === 'solution-json'" :requestedPage="$params.path" />
