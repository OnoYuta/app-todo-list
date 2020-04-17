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
            errors: {},
            categories: ['家事', '買い物', '娯楽'],
            newTodoTitle: null,
            newTodoCategory: '未選択',
        },
        methods: {
            addTodo: function () {
                if (!this.addTodoRequestValid())
                    this.todos.push({
                        id: this.increment++,
                        title: this.newTodoTitle,
                        categoryId: this.newTodoCategory,
                        isDone: false,
                    });
                this.newTodoTitle = '';
                this.newTodoCategory = '未選択';
            },
            addTodoRequestValid: function () {
                if (this.newTodoTitle && this.categories.includes(this.newTodoCategory)) {
                    return true;
                }

                this.errors = [];

                if (!this.newTodoTitle) {
                    this.errors.title = 'タイトルの入力は必須です。';
                }

                if (!this.categories.includes(this.newTodoCategory)) {
                    this.errors.category = 'カテゴリを選択してください。';
                }

                console.log(this.errors);
            },
        }
    });

})();