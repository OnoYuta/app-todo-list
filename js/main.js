(function () {

    let vm = new Vue({
        el: '#app',
        data: {
            increment: 4,
            todos: [
                {
                    id: '1',
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: '2',
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: '3',
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                }
            ],
            newTodoTitle: '',
            newTodoCategory: '',
        },
        methods: {
            addTodo: function () {
                this.todos.push({
                    id: this.increment++,
                    title: this.newTodoTitle,
                    categoryId: this.newTodoCategory,
                    isDone: false,
                });
                this.newTodoTitle = '';
                this.newTodoCategory = '';
            }
        }
    });

})();