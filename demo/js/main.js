//搜索提示
$('#txt').keyup(function() {
	if($('#txt').val().length < 1) return;
	$.ajax({
		url: 'https://api.douban.com/v2/book/search',
		data: {
			q: $('#txt').val()
		},
		dataType: 'jsonp',
		success: function(data) {
			$('#search_suggest ul').html('');
			$('#search_suggest').css('display', 'block');
			for(var i = 0; i < 6; i++) {
				//				console.log(data.books[i])
				$('#tmplPrompt').tmpl(data.books[i]).appendTo('#search_suggest ul');
			}
		},
		error: function() {
			console.log('数据请求失败');
		}
	});
})

//失去焦点隐藏提示框
$('#txt').blur(function() {
	setTimeout(function() {
		$('#search_suggest').css('display', 'none');
	}, 100)

})

//点击搜索按钮
$('#btn').click(function() {
	if($('#txt').val().length < 1) return;

	$('#list').html('');
	$('#page').show();

	$.ajax({
		url: 'https://api.douban.com/v2/book/search',
		data: {
			q: $('#txt').val(),
			count: 10,
			start: 0,
		},
		dataType: 'jsonp',
		success: function(data) {

			$('#num').html(data.total);
			$('#pages').html(Math.ceil(data.total / data.count));

			//加载数据
			for(var i = 0; i < 10; i++) {
				$('#tmplList').tmpl(data.books[i]).appendTo('#list');
			}

			//翻页
			layui.use('laypage', function() {
				var laypage = layui.laypage;

				laypage.render({
					elem: 'page',
					count: data.total, //数据总数	
					layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
					jump: function(obj) {
						$('#pages').html(Math.ceil(obj.count / obj.limit));
						NowPage(obj.curr, obj.limit)
					}
				});
			})

		},
		error: function() {
			console.log('数据请求失败');
		}
	});
})

////获取宽度
function getWidth() {
	return(this.data.rating.average * 7.9).toFixed(1);
}

//展示当前页码
function NowPage(startnum, countnum) {
	$.ajax({
		url: 'https://api.douban.com/v2/book/search',
		data: {
			q: $('#txt').val(),
			count: countnum,
			start: (startnum - 1) * 15
		},
		dataType: 'jsonp',
		success: function(data) {
			$('#list').html('');
			for(var i = 0; i < data.books.length; i++) {
				$('#tmplList').tmpl(data.books[i]).appendTo('#list');
			}
		},
		error: function() {
			console.log('数据请求失败');
		}
	});
}