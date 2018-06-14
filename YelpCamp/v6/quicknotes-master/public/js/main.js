/**
 * Created by Anurag on 31-12-2016.
 */
function deletenote(id){
    $.ajax({
        type:'POST',
        url:'/deletenote',
        data:{id:id},
        success:function(data){
            var result = JSON.parse(data);
            if(result.error)
            {
                window.location='/login';
            }
            else
            {
                $('#'+id).parent().parent().parent().parent().parent().fadeOut();
            }
        }});
}
$('#savenewnote').click(
    function () {
        var title = $('#newnotetitle').val();
        var text = $('#newnotetext').val();
        $.ajax({
            type:'POST',
            url:'/addnote',
            data:{title:title,text:text},
            success:function(data){
                var result = JSON.parse(data);
                if(result.error)
                {
                    window.location='/login';
                }
                else
                {
                    var divContent = '<div class="col-md-4"><div class="portlet"><div class="portlet-header"><h3>'+result.title+'</h3><ul class="portlet-tools pull-right"><li><a class="btn btn-sm btn-icon" onclick="deletenote(\''+result.id+'\');" id='+result.id+'><i class="fa fa-times"></i></a></li></ul></div><div class="portlet-content">'+result.text+'</div></div></div>';
                    $('#notes').find('.row').last().append(divContent);
                    ('#newnotetitle').val('');
                    $('#newnotetext').val('');
                }
            }});
    }
);