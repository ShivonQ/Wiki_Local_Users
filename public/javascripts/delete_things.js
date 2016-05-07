/**
 * Created by School on 5/6/2016.
 */

    $(document).ready(function () {
        $("#large_legend").on("click", function () {
            $(this).parent().find('.admin_wrapper').slideToggle("med");
        });

        $('button.delete_npc').click(function () {
            var NPC_id = $(this).attr('npc_id');
            var deleteURL = "/data/delete/" + NPC_id;
            console.log('**************'+NPC_id);
            console.log('**************'+deleteURL);
            $.ajax(
                {method: 'delete', url: deleteURL}
            ).done(function () {
                var selector='#'+NPC_id;
                $(selector).fadeOut(function () {
                    this.remove;
                });
            }).fail(function () {
                console.log('There was a failure somehwere in the deleteion')
            })
        })
});