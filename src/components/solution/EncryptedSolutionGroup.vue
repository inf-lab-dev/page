<template>
    <SolutionLock v-if="successfulRenderers.length === 0" />
    <div
        v-if="solutions.length > 0"
        v-show="successfulRenderers.length > 0"
        class="vp-code-group vp-adaptive-theme"
    >
        <div class="tabs">
            <template v-for="{ member, tabId } of renderers" :key="tabId">
                <input
                    type="radio"
                    :value="tabId"
                    :name="`group-${groupId}`"
                    :id="`tab-${groupId}-${tabId}`"
                    v-model="activeSolution"
                />
                <label
                    :data-title="member.name"
                    :for="`tab-${groupId}-${tabId}`"
                    >{{ member.name }}</label
                >
            </template>
        </div>
        <div class="blocks">
            <div
                :class="[
                    'encrypted-solution',
                    $style.member,
                    {
                        [$style['member--encrypted']]: state !== 'success',
                        active: activeSolution === tabId,
                    },
                ]"
                v-for="({ member, tabId, state }, index) of renderers"
                :key="tabId"
            >
                <EncryptedSolution
                    :source-prefix="member.sourcePrefix"
                    @decrypted="renderers[index].state = 'success'"
                    @failed="renderers[index].state = 'error'"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, effect, ref, shallowRef, useId } from 'vue';
import EncryptedSolution from './EncryptedSolution.vue';
import SolutionLock from './util/SolutionLock.vue';

export interface SolutionMember {
    name: string;
    sourcePrefix?: string;
}

interface SolutionRenderer {
    member: SolutionMember;
    tabId: number;
    state: 'loading' | 'success' | 'error';
}

const props = defineProps<{
    solutions: SolutionMember[];
}>();

const groupId = useId();
const activeSolution = shallowRef();
const renderers = ref<SolutionRenderer[]>([]);

const successfulRenderers = computed(() =>
    renderers.value.filter(({ state }) => state === 'success'),
);

effect(() => {
    renderers.value = props.solutions.map((member, index) => ({
        member,
        tabId: index,
        state: 'loading',
    }));

    activeSolution.value = renderers.value[0]?.tabId;
});
</script>

<style lang="scss" module>
.member {
    &.member--encrypted {
        $borderRadius: 6px;

        border-bottom-right-radius: $borderRadius;
        border-bottom-left-radius: $borderRadius;

        background-color: var(--bgColor-muted);

        padding: var(--base-size-8);
    }
}
</style>
