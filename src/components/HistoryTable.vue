<template>
    <table>
        <thead>
        <tr >
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(r, idx) of records" :key="r.id">

            <td>{{idx + 1}}</td>
            <td>{{r.amount | currency}}</td>
            <td>{{r.date | date('date')}}</td>
            <td>{{r.categoryName}}</td>
            <td>
                <span class="white-text badge " :class="r.typeClass">{{r.typeText}}</span>
            </td>
            <td>
                <button class="btn-small btn"
                        v-tooltip="'Посмотреть запись'"
                        @click="$router.push('/detail/'+r.id)">
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "HistoryTable",
        props:{
            records:{
                required: true,
                type: Array
            }
        },
        data:()=>({
            index: 1
        })
    }
</script>

