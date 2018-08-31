//内容页


var search=window.location.search

var id=search.slice(search.indexOf('=')+1)


console.log(id)

$(document).ready(
	$.ajax({
		type:'GET',
		url: 'https://api.douban.com/v2/book/'+id,
		dataType: 'jsonp',
		success: function(data) {
			console.log(data)
			
			$('#tmplContent').tmpl(data).appendTo('#content');
			
		},
		error: function() {
			console.log('数据请求失败');
		}
	})
)


$('#back').click(function(){
	window.history.back(-1)
})
