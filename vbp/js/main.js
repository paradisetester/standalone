const app = function () {
	
	const API_BASE = 'https://script.google.com/macros/s/AKfycbxZwLrnP_FqdSIggShJIOJZqO9mqOhQyBo0BgsSLwz1lLoiobc/exec';
	const API_KEY = 'abcdef';
	const CATEGORIES = ['general', 'financial', 'technology', 'marketing'];

	const state = {activePage: 1, activeCategory: null};
	const STATES = [];
	const page = {};
	
	/********onload function initialized****************/
	function init () {	
		page.map = document.getElementById('map');

		_buildFilter();		
	}
	
	
	function _buildApiUrl (page, category) {
		let url = API_BASE;
		url += '?key=' + API_KEY;
		url += '&page=' + page;
		url += '&category=' + 'general';
		//url += category !== null ? '&category=' + category : '';

		return url;
	}
	
	function _getStates () {
		_setNotice('Loading posts');

		fetch(_buildApiUrl(state.activePage, state.activeCategory))
			.then((response) => response.json())
			.then((json) => {
				if (json.status !== 'success') {
					_setNotice(json.message);
				}

				_renderPosts(json.data);
				_renderPostsPagination(json.pages);
			})
			.catch((error) => {
				_setNotice('Unexpected error loading posts');
			})
	}
	
	
	return {
		init: init
 	};
}();