var searchData;
var responseData;
function searchSelData(){
  var dummyData = [];
  var text = (document.getElementById("searchText").value).toLowerCase();
  if(text.trim() == ''){
    searchData = responseData.query.search;
  }
  else{
    var data = responseData.query.search;
    for(var i=0; i<data.length; i++){
      var snippet = (data[i].snippet).toLowerCase();
      var title = (data[i].title).toLowerCase();
      if(snippet.indexOf(text) > -1 || title.indexOf(text) > -1){
        dummyData.push(data[i]);
      }
    }
    searchData = dummyData;
  }
  changeSortOrder(searchData);
}
function changeSortOrder(arr){
  order = document.getElementById("mySelect").value;
  arr = arr ? arr : searchData;
  arr.sort(function(a, b) {
      return  order == 'asc' ? (a.title) > (b.title) : (a.title) < (b.title);
  });
  bindData(arr);
}
function bindData(data){
  var list = "<ul>";
  for(var i=0;i<data.length;i++){
    list += "<li>"
    for(var label in data[i]){
      if(label != 'ns') {
        list += '<p><b>'+label+':</b>'+
            '<span>'+data[i][label]+'</span></p>'
      }
    }
    list += data.length-1 == i ? "</li>" : "</li>";
  }
  list += '</ul>';
  document.getElementById('demo').innerHTML = '';
  document.getElementById('demo').innerHTML = list;
}
(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      responseData = JSON.parse(this.responseText);
      searchData = responseData.query.search;
      changeSortOrder(searchData);
    }
  };
  xhttp.open("GET", "/getWikiJson", true);
  xhttp.send()
})();
