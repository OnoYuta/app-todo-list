(function () {

    let vm = new Vue({
        el: '#app',
        increment: 4,
        data: {
            todosInList: [],
            filter: {
                currentPage: null,
                lastPage: null,
                searchTitle: null,
                searchCategory: 0,
                updateCurrentPage: function (index) {
                    $('#input-page').val(index);
                    $('#filter-todos-form').submit();
                },
                previosPage: function () {
                    if (vm.filter.currentPage <= 1) return;
                    $('#input-page').val(vm.filter.currentPage - 1);
                    $('#filter-todos-form').submit();
                },
                nextPage: function () {
                    if (vm.filter.currentPage >= vm.filter.lastPage) return;
                    $('#input-page').val(vm.filter.currentPage + 1);
                    $('#filter-todos-form').submit();
                },
            },
            todos: [
                {
                    id: 1,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 2,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 3,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
                {
                    id: 4,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 5,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 6,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
                {
                    id: 7,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 8,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 9,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
                {
                    id: 10,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 11,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 12,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
                {
                    id: 13,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 14,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 15,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
                {
                    id: 16,
                    title: 'ゴミ捨て',
                    categoryId: '家事',
                    isDone: false,
                }, {
                    id: 17,
                    title: '充電コードを買う',
                    categoryId: '買い物',
                    isDone: true,
                }, {
                    id: 18,
                    title: '子供と公園に行く',
                    categoryId: '娯楽',
                    isDone: false,
                },
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
            alertDeleteHidden: true,
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
                    id: ++this.increment,
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
            addCategory: function (e) {
                // 日本語入力中のEnterキー操作は無効にする
                if (e.keyCode !== 13) return;

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
            },
            updateTodoList: function () {
                this.filter.lastPage = Math.floor((this.todos.length - 1) / 10) + 1;
                this.filter.currentPage = this.getParam('page') ? Number(this.getParam('page')) : 1;
                let from = (this.filter.currentPage - 1) * 10;
                let to = Math.min(this.todos.length, from + 10);
                this.todosInList = this.todos.slice(from, to);
            },
            deleteTodos: function (targetIdList) {
                this.alertDeleteHidden = true;

                this.todos = this.todos.filter(function (todo) {
                    return $.inArray(todo.id, targetIdList) === -1;
                }, targetIdList);

                this.alertDeleteHidden = false;
            },
            getParam: function (name) {
                let url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';

                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            purge: function () {
                this.deleteTodos(this.doneTodosInList);
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
            purgeClassObject: function () {
                return {
                    'disabled': !this.doneTodosInList.length,
                }
            },
            isCreateTodoActive: function () {
                let valid = this.addTodoRequestValid();
                this.createAlert.isHidden = true;
                this.createAlert.errors = [];
                return valid;
            },
            isCreateCategoryActive: function () {
                let valid = this.addCategoryRequestValid();
                this.createCategory.isHidden = true;
                this.createCategory.errors = [];
                return valid;
            },
            doneTodosInList: function () {
                let result = [];
                for (let i = 0; i < this.todosInList.length; i++) {
                    if (this.todosInList[i].isDone) result.push(this.todosInList[i].id);
                }
                return result;
            }
        },
        watch: {
            todos: {
                handler: function () {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                    this.updateTodoList();
                },
                deep: true,
            },
            categories: {
                handler: function () {
                    localStorage.setItem('categories', JSON.stringify(this.categories));
                },
                deep: true,
            }
        },
        mounted: function () {
            if (localStorage.getItem('todos')) {
                this.todos = JSON.parse(localStorage.getItem('todos'));

                // ToDoのindexの最大値をインクリメントにセットする
                var index = this.todos.map(function (todo) {
                    return todo.id;
                });

                this.increment = Math.max.apply(null, index);
            } else {
                this.increment = this.todos.length;
                this.updateTodoList();
            }

            if (localStorage.getItem('categories')) {
                this.categories = JSON.parse(localStorage.getItem('categories'));
            }

            this.filter.currentPage = this.getParam('page') ? Number(this.getParam('page')) : 1;
        },
    });

})();