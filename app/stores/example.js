/* Использование в компоненте
    В script setup:
      const example = useExampleStore();
    В template:
      {{example.items}}
      {{example.total}}
      @click="example.add(obj)"
    ПРИМЕР, КАК НЕЛЬЗЯ: 
      const {items, total, add} = useExampleStore();
      (при деструктаризации теряет реактивность getters)
*/

/*SETUP STORE*/
export const useExampleStore = defineStore('testic', () => {
  //---------------------------------------------- STATE ---------------------------------------------------------
  const items = ref([])

  
  //---------------------------------------------- ACTIONS ---------------------------------------------------------
  function add(item) {
    items.value.push(item)
  }

  
  //---------------------------------------------- GETTERS ---------------------------------------------------------
  const total = computed(() => {
    return items.value.length
  })


  // В конце обязательно возвращаем то, что будет публичным
  return { 
    items, 
    total, 
    add
  }
})
