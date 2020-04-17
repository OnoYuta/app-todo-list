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
            createAlert: {
                title: null,
                isHidden: true,
                errors: [],
                message: '新しいToDoが追加されました。',
            },
            categories: ['家事', '買い物', '娯楽'],
            newTodoTitle: null,
            newTodoCategory: '未選択',
        },
        methods: {
            addTodo: function () {
                if (!this.addTodoRequestValid()) {
                    return;
                }

                this.todos.push({
                    id: this.increment++,
                    title: this.newTodoTitle,
                    categoryId: this.newTodoCategory,
                    isDone: false,
                });

                this.createAlert.title = '成功!';
                this.createAlert.isHidden = false;


                this.newTodoTitle = null;
                this.newTodoCategory = '未選択';
            },
            addTodoRequestValid: function () {
                this.createAlert.isHidden = true;
                this.createAlert.title = null;
                this.createAlert.errors = [];
                this.createAlert.errors = [];

                if (this.newTodoTitle && this.categories.includes(this.newTodoCategory)) {
                    return true;
                }

                this.createAlert.errors = [];

                if (!this.newTodoTitle) {
                    this.createAlert.errors.push('タイトルの入力は必須です。');
                }

                if (!this.categories.includes(this.newTodoCategory)) {
                    this.createAlert.errors.push('カテゴリを選択してください。');
                }

                this.createAlert.isHidden = false;
                this.createAlert.title = '失敗!';

            },
            hideCreateAlert: function () {
                this.createAlert.isHidden = true;
            }
        },
        computed: {
            classObject: function () {
                return {
                    'alert-info': this.createAlert.errors.length === 0,
                    'alert-danger': this.createAlert.errors.length !== 0,
                }
            }
        },
    });



})();