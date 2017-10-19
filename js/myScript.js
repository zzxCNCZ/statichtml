var hiddenNodes=[];	//用于存储被隐藏的结点

$(function(){
	init();
})

function init(){
	var zNodes=[	//ztree 测试数据，也可以从数据库拉取
		{
			name:"根节点-000",
			open:true,
			children:[
				{
					name:"父节点-1-AB",
					open:true, 
					children:[
						{
							name:"叶子节点-A-1"
						},
						{
							name:"叶子节点-A-2"
						},
						{
							name:"叶子节点-B-1"
						},
						{
							name:"叶子节点-B-2"
						}
					]
				},{
					name:"父节点-2-CD",
					open:true, 
					children:[
						{
							name:"叶子节点-C-1"
						},
						{
							name:"叶子节点-C-2"
						},
						{
							name:"叶子节点-D-1"
						},
						{
							name:"叶子节点-D-2"
						}
					]
				},
			]
		}
	];

	var setting = {		//ztree配置选项
			data: {
				key: {
					name:"name",
					title: "name"
				}
			}
	};

	zTreeObj = $.fn.zTree.init($("#tree-obj"), setting, zNodes);

	$("#search-bt").click(filter);
};

//过滤ztree显示数据
function filter(){
	//显示上次搜索后背隐藏的结点
	zTreeObj.showNodes(hiddenNodes);

	//查找不符合条件的叶子节点
	function filterFunc(node){
		var _keywords=$("#keyword").val();
		if(node.isParent||node.name.indexOf(_keywords)!=-1) return false;
		return true;		
	};

	//获取不符合条件的叶子结点
	hiddenNodes=zTreeObj.getNodesByFilter(filterFunc);
	
	//隐藏不符合条件的叶子结点
	zTreeObj.hideNodes(hiddenNodes);
};