<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers } from '~/api/route.users'
import { onMounted, ref, computed } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRouter, useRoute } from 'vue-router'
import { ElementEdit } from './elements'

const table = ref(null)
const store = useStore()

const route = useRoute()
const router = useRouter()

const user_id = computed(() => {
  return route.query.user_id
})

onMounted(async () => {
  const data = await getAllUsers(store.$state.access_token)

  const heading = ['ID', 'Email', 'Уровень доступа']
  table.value = createTable(heading, [...data])
})
</script>

<template>
  <div class="team">
    <div class="team__content">
      <element-table
        title="Список пользователей"
        class="team__table"
        v-if="table && !user_id"
        :table="table"
        type="team"
      />
      <element-edit
        :token="store.$state.access_token"
        class="team__edit"
        @close="() => router.push('/team')"
        :user-id="user_id"
        v-else-if="store.$state.access_token && user_id"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.team {
  min-height: calc(100% - 100px);
  background-color: #ffffff;
  border-radius: 10px;
  &__table {
    @include deep('.table__heading') {
      grid-template-columns: 1fr 4fr 1fr;
    }
    @include deep('.table__item') {
      grid-template-columns: 1fr 4fr 1fr;
    }
  }
}
</style>
