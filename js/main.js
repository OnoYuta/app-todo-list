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
                hideCreateTodoAlert: function () {
                    vm.createAlert.isHidden = true;
                },
            },
            createCategory: {
                newCategoryName: null,
                title: null,
                isHidden: true,
                errors: [],
                message: '新しいカテゴリが追加されました。',
                classObject: function () {
                    return {
                        'alert-info': vm.createCategory.errors.length === 0,
                        'alert-danger': vm.createCategory.errors.length !== 0,
                    }
                },
                hideCreateCategoryModal: function () {
                    $('#modal-create-category').modal('hide');
                    vm.createCategory.isHidden = true;
                },
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

                this.newTodoTitle = null;
                this.newTodoCategory = '未選択';
            },
            addTodoRequestValid: function () {
                this.createAlert.isHidden = true;
                this.createAlert.errors = [];

                if (!this.newTodoTitle) {
                    this.createAlert.errors.push('タイトルの入力は必須です。');
                }

                if (!this.categories.includes(this.newTodoCategory)) {
                    this.createAlert.errors.push('カテゴリを選択してください。');
                }

                this.createAlert.isHidden = false;

                if (this.createAlert.errors.length) {
                    this.createAlert.title = '失敗!';
                    return false;
                }

                this.createAlert.title = '成功!';
                return true;
            },
            addCategory: function () {
                if (!this.addCategoryRequestValid()) {
                    return;
                }

                this.categories.push(this.createCategory.newCategoryName);

                this.createCategory.title = '成功!';
                this.createCategory.isHidden = false;

                this.createCategory.newCategoryName = null;
            },
            addCategoryRequestValid: function () {
                this.createCategory.isHidden = true;
                this.createCategory.errors = [];

                if (!this.createCategory.newCategoryName) {
                    this.createCategory.errors.push('カテゴリ名を入力してください。');
                } else if (this.categories.includes(this.createCategory.newCategoryName)) {
                    this.createCategory.errors.push('そのカテゴリは既に存在します。');
                }

                this.createCategory.isHidden = false;

                if (this.createCategory.errors.length) {
                    this.createCategory.title = '失敗!';
                    return false;
                }

                this.createCategory.title = '成功!';
                return true;
            }
        },
        computed: {
            createTodoClassObject: function () {
                return {
                    'alert-info': this.createAlert.errors.length === 0,
                    'alert-danger': this.createAlert.errors.length !== 0,
                }
            },
            createCategoryClassObject: function () {
                return {
                    'alert-info': this.createCategory.errors.length === 0,
                    'alert-danger': this.createCategory.errors.length !== 0,
                }
            },
        },
    });

})();