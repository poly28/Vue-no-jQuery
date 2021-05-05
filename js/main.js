new Vue({
	el: '#app',
	data: {
		items: null, // APIで取得したデータ
		keyword: '', // APIで検索時に使用するキーワード
		message: '', // アプリの稼働状態
	},
	watch: {
		// 検索キーワードの変更時
		keyword: function (newKeyword, oldKeyword) {
			// メッセージ表示「入力が停止するのを待っています」
			this.message = 'Waiting for you stop typing...';
			// debouncedGetAnswerをメソッドとして呼び出し
			this.debouncedGetAnswer();
		},
	},
	created: function () {
		// ??????
		this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000);
	},
	methods: {
		// 検索結果表示用メソッド
		getAnswer: function () {
			//
			// キーワードが空文字の時
			if (this.keyword === '') {
				this.items = null; // itemsをnull
				this.message = ''; // messageを空文字
				return;
			}
			// 非同期通信の結果が出るまでの処理
			this.message = 'Loading...';
			// axiosの処理内でVueインスタンスのdataにアクセスするため、
			// thisを変数vmに格納
			let vm = this;
			// axiosでQiitaのAPIを使用するときの引数
			let params = { page: 1, per_page: 20, querry: this.keyword };

			// APIの通信処理
			axios
				.get('https://qiita.com/api/v2/items', { params })

				// 通信成功時の処理
				.then(function (response) {
					console.log(response);
					vm.items = response.data;
				})

				// 通信失敗時の処理
				.catch(function (error) {
					vm.message = 'Error!' + error;
				})

				// 通信完了後の処理
				.finally(function () {
					vm.message = '';
				});
		},
	},
});
