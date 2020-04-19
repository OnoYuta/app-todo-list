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
                selectPage: function (index) {
                    if (index === this.currentPage) return;
                    this.currentPage = index;
                    this.submitAction();
                },
                previosPage: function () {
                    if (this.currentPage <= 1) return;
                    this.currentPage--;
                    this.submitAction();
                },
                nextPage: function () {
                    if (this.currentPage >= this.lastPage) return;
                    this.currentPage++;
                    this.submitAction();
                },
                submitAction: function () {
                    this.currentPage === 1 ? $('#input-page').remove() : $('#input-page').val(this.currentPage);
                    if (Number(this.searchCategory) === 0) $('#input-category').remove();
                    if (this.searchTitle === null) $('#input-title').remove();
                    $('#filter-todos-form').submit();
                },
                submitByKey: function (e) {
                    if (e.keyCode !== 13) return;
                    this.submitAction();
                },
                excute: function (todos) {
                    if (this.searchTitle !== null && Number(this.searchCategory) !== 0) {
                        return this.filterByTitleAndCategory(todos);
                    }

                    if (this.searchTitle !== null) {
                        return this.filterByTitle(todos);
                    }

                    if (Number(this.searchCategory) !== 0) {
                        return this.filterByCategory(todos);
                    }

                    return todos;
                },
                filterByTitle: function (todos) {
                    if (this.searchTitle === null) return todos;

                    return todos.filter(function (todo) {
                        return todo.title.indexOf(this.title) > -1;
                    }, { title: this.searchTitle });
                },
                filterByCategory: function (todos) {
                    if (Number(this.searchCategory) === 0) return todos;

                    return todos.filter(function (todo) {
                        return todo.category === this.category;
                    }, { category: vm.categories[Number(this.searchCategory) - 1] });
                },
                filterByTitleAndCategory: function (todos) {
                    if (this.searchTitle === null || Number(this.searchCategory) === 0) return todos;

                    return todos.filter(function (todo) {
                        return todo.title.indexOf(this.title) > -1 && todo.category === this.category;
                    }, { title: this.searchTitle, category: vm.categories[Number(this.searchCategory) - 1] });
                },
                updateCurrentPage: function (todos) {
                    this.lastPage = Math.floor((todos.length - 1) / 10) + 1;
                    if (this.currentPage > this.lastPage) this.currentPage = this.lastPage;
                },
            },
            todos: [],
            createTodo: {
                isHidden: true,
                alertTitle: null,
                alertCategory: null,
                hideCreateTodoAlert: function () {
                    vm.createTodo.isHidden = true;
                },
            },
            createCategory: {
                newCategoryName: null,
                title: null,
                isHidden: true,
                alert: null,
                active: false,
                hideCreateCategoryModal: function () {
                    $('#modal-create-category').modal('hide');
                    vm.createCategory.isHidden = true;
                    vm.createCategory.alert = null;
                    vm.createCategory.newCategoryName = null;
                },
            },
            alertDeleteHidden: true,
            categories: [],
            newTodoTitle: null,
            newTodoCategory: '未選択',
        },
        methods: {
            addTodo: function (e) {
                this.createTodo.alertTitle = null;
                this.createTodo.alertCategory = null;

                if (!this.newTodoTitle) {
                    this.createTodo.alertTitle = 'タイトルの入力は必須です。';
                }

                if (!this.categories.includes(this.newTodoCategory)) {
                    this.createTodo.alertCategory = 'カテゴリを選択してください。';
                }

                if (this.createTodo.alertTitle || this.createTodo.alertCategory) return;

                this.todos.push({
                    id: ++this.increment,
                    title: this.newTodoTitle,
                    category: this.newTodoCategory,
                    isDone: false,
                });

                this.createTodo.isHidden = false;
                this.newTodoTitle = null;
                this.newTodoCategory = '未選択';
            },
            addCategory: function (e) {
                this.createCategory.isHidden = true;
                this.createCategory.alert = null;

                // 日本語入力中のEnterキー操作は無効にする
                if (e.type === 'keydown' && e.keyCode !== 13) return;

                if (!this.createCategory.newCategoryName) {
                    this.createCategory.alert = 'カテゴリ名を入力してください。';
                } else if (this.categories.includes(this.createCategory.newCategoryName)) {
                    this.createCategory.alert = 'そのカテゴリは既に存在します';
                }

                if (this.createCategory.alert) return;

                this.categories.push(this.createCategory.newCategoryName);
                this.createCategory.isHidden = false;
                this.createCategory.newCategoryName = null;
            },
            updateTodoList: function () {
                let filteredTodos = this.filter.excute(this.todos);
                this.filter.updateCurrentPage(filteredTodos);
                let from = (this.filter.currentPage - 1) * 10;
                let to = Math.min(filteredTodos.length, from + 10);
                this.todosInList = filteredTodos.slice(from, to);
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
            },
            restoreSampleTodos: function () {
                this.todos = [
                    {
                        id: 1,
                        title: '木曜ゴミ捨て',
                        category: '家事',
                        isDone: false,
                    }, {
                        id: 2,
                        title: '充電コードを買う',
                        category: '買い物',
                        isDone: true,
                    }, {
                        id: 3,
                        title: '子供と公園に行く',
                        category: '約束',
                        isDone: false,
                    },
                    {
                        id: 4,
                        title: 'Vue.jsの動画を見る',
                        category: '勉強',
                        isDone: false,
                    }, {
                        id: 5,
                        title: '自動開閉ゴミ箱をタイムセールで買う',
                        category: '買い物',
                        isDone: true,
                    }, {
                        id: 6,
                        title: '下北沢でカレー食べる',
                        category: '約束',
                        isDone: false,
                    },
                    {
                        id: 7,
                        title: '会社で渡された本を読む',
                        category: '仕事',
                        isDone: false,
                    }, {
                        id: 8,
                        title: '感想文を書く',
                        category: '仕事',
                        isDone: true,
                    }, {
                        id: 9,
                        title: '保育園のお知らせを読む',
                        category: '家事',
                        isDone: false,
                    },
                    {
                        id: 10,
                        title: 'ToDoアプリを作る',
                        category: '勉強',
                        isDone: false,
                    }, {
                        id: 11,
                        title: 'マウスパッドを探す',
                        category: '買い物',
                        isDone: true,
                    }, {
                        id: 12,
                        title: 'コートをクリーニングに出す',
                        category: '家事',
                        isDone: false,
                    },
                    {
                        id: 13,
                        title: 'ダンボールゴミ捨て',
                        category: '家事',
                        isDone: false,
                    }, {
                        id: 14,
                        title: '子供と運動公園に行く',
                        category: '約束',
                        isDone: true,
                    }, {
                        id: 15,
                        title: 'タピオカを飲む',
                        category: '約束',
                        isDone: false,
                    },
                    {
                        id: 16,
                        title: 'プレゼン資料の作り方を読む',
                        category: '勉強',
                        isDone: false,
                    }, {
                        id: 17,
                        title: 'Bootstrapで何か作る',
                        category: '勉強',
                        isDone: true,
                    }, {
                        id: 18,
                        title: '鍋をきれいにする',
                        category: '家事',
                        isDone: false,
                    },
                ];
                this.categories = ['仕事', '買い物', '約束', '家事', '勉強'];
            }
        },
        computed: {
            purgeClassObject: function () {
                return {
                    'disabled': !this.doneTodosInList.length,
                }
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
            if (localStorage.getItem('todos') && localStorage.getItem('categories')) {
                this.todos = JSON.parse(localStorage.getItem('todos'));
                this.categories = JSON.parse(localStorage.getItem('categories'));

                // ToDoのindexの最大値をインクリメントにセットする
                var index = this.todos.map(function (todo) {
                    return todo.id;
                });

                this.increment = Math.max.apply(null, index);
            } else {
                this.restoreSampleTodos();
            }

            this.filter.currentPage = this.getParam('page') ? Number(this.getParam('page')) : 1;
            this.filter.searchTitle = this.getParam('title') ? this.getParam('title') : null;
            this.filter.searchCategory = this.getParam('category') ? Number(this.getParam('category')) : 0;
        },
    });

})();