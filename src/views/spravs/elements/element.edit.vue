<script setup>
import { ElementTable } from '~/components/elements'
import { createTable } from '~/core/table'
import { getAllUsers } from '~/api/route.users'
import { editSn, editKpgz, editSpgz, editTsn } from '~/api/route.sprav.js'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useStore } from '~/stores/stores.main'
import { get_token } from '~/api/route.auth'
import { useRoute } from 'vue-router'
import { CommonButton, CommonInput, CommonTextarea } from '~/components/common'

const props = defineProps({
  item: {
    type: Object,
  },
})

const emit = defineEmits(['back'])

const table = ref(null)
const store = useStore()

const route = useRoute()

const form = ref({
  code: '',
  name: '',
  text: '',
  uom: '',
  okpd: '',
  okpd2: '',
  description: '',
  id: null,
  price: null,
  data_id: null,
})

const spravs = (args) => {
  return {
    sn: () => editSn(...args),
    kpgz: () => editKpgz(...args),
    spgz: () => editSpgz(...args),
    tsn: () => editTsn(...args),
  }
}

const which_sprav = computed(() => {
  return route.query.sprav
})

const back = () => {
  emit('back')
}

const save = async () => {
  const all_spravs = spravs([
    store.$state.access_token,
    store.$state.user_id,
    { ...form.value },
  ])

  await all_spravs[which_sprav.value]()
  back()
}

onMounted(() => {
  form.value.code = props.item.code
  form.value.id = props.item.id
  form.value.name = props.item.name
  form.value.text = props.item.text
  form.value.uom = props.item.uom
  form.value.price = props.item.price
  form.value.data_id = props.item.data_id
  form.value.okpd = props.item.okpd
  form.value.okpd2 = props.item.okpd2
  form.value.description = props.item.description

  for (let key in form.value) {
    if (!form.value[key]) {
      delete form.value[key]
    }
  }
})

onBeforeUnmount(() => {
  form.value = {
    code: '',
    name: '',
    text: '',
    uom: '',
    okpd: '',
    okpd2: '',
    description: '',
    id: null,
    price: null,
    data_id: null,
  }
})
</script>

<template>
  <div class="edit">
    <div class="edit__title">
      <h1 class="edit__title-text">Изменить позицию справочника</h1>
      <common-button @click="back">Вернутся к справочникам</common-button>
    </div>
    <form class="edit__form">
      <div class="edit__label" v-if="item.data_id">
        <p class="edit__subtitle">ID:</p>
        <common-input
          type="number"
          v-model="form.data_id"
          :value="form.data_id"
        />
      </div>
      <div class="edit__label" v-if="item.code">
        <p class="edit__subtitle">Шифр:</p>
        <common-input v-model.number="form.code" :value="form.code" />
      </div>
      <div class="edit__label" v-if="item.price">
        <p class="edit__subtitle">Стоимость(руб):</p>
        <common-input
          type="number"
          v-model.number="form.price"
          :value="form.price"
        />
      </div>
      <div class="edit__label" v-if="item.uom">
        <p class="edit__subtitle">Единица измерения:</p>
        <common-input v-model="form.uom" :value="form.uom" />
      </div>
      <div class="edit__label" v-if="item.okpd">
        <p class="edit__subtitle">ОКПД:</p>
        <common-input v-model="form.okpd" :value="form.okpd" />
      </div>
      <div class="edit__label" v-if="item.okpd2">
        <p class="edit__subtitle">ОКПД2:</p>
        <common-input v-model="form.okpd2" :value="form.okpd2" />
      </div>
      <div class="edit__label" v-if="form.text">
        <p class="edit__subtitle">Название:</p>
        <common-textarea v-model="form.text" :value="form.text" />
      </div>
      <div class="edit__label" v-if="form.name">
        <p class="edit__subtitle">Название:</p>
        <common-textarea v-model="form.name" :value="form.name" />
      </div>
      <div class="edit__label" v-if="form.description">
        <p class="edit__subtitle">Описание:</p>
        <common-textarea v-model="form.description" :value="form.description" />
      </div>
      <common-button @click="save" class="edit__button"
        >Сохранить</common-button
      >
    </form>
  </div>
</template>

<style lang="scss" scoped>
.edit {
  padding: 40px;
  &__label {
    margin-bottom: 20px;
  }
  &__title {
    @include tg-h5-bold;
    color: #000000;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  &__subtitle {
    margin-bottom: 10px;
    display: block;
  }
  &__select {
    border: 1px solid $border-color;
    border-radius: 5px;
    width: 300px;
    height: 50px;
  }
  &__input {
    border: 1px solid $border-color;
    border-radius: 5px;
    display: block;
    height: 50px;
    padding: 0 10px;
    width: 100%;
    margin-bottom: 20px;
    max-width: 300px;
  }
  &__button {
    margin-top: 50px;
  }
}
</style>
